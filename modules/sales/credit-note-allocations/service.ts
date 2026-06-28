import { getTenantKnex } from "@vercent/database/knex";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createSalesCreditNotesRepository, salesCreditNotesRepository } from "../credit-notes/repository";
import type { SalesCreditNoteRepository } from "../credit-notes/types";
import { createSalesDebitNotesRepository, salesDebitNotesRepository } from "../debit-notes/repository";
import type { SalesDebitNoteRepository } from "../debit-notes/types";
import { createSalesInvoicesRepository, salesInvoicesRepository } from "../invoices/repository";
import type { SalesInvoiceRepository } from "../invoices/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { createCreditNoteAllocationsRepository, creditNoteAllocationsRepository } from "./repository";
import { creditNoteAllocationCreateSchema, creditNoteAllocationListSchema } from "./schemas";
import type { CreditNoteAllocationActionContext, CreditNoteAllocationCreateInput, CreditNoteAllocationRepository } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: CreditNoteAllocationActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function createCreditNoteAllocationsService(
  repository: CreditNoteAllocationRepository = creditNoteAllocationsRepository,
  creditNotes: SalesCreditNoteRepository = salesCreditNotesRepository,
  invoices: SalesInvoiceRepository = salesInvoicesRepository,
  debitNotes: SalesDebitNoteRepository = salesDebitNotesRepository,
) {
  async function allocateWith(
    allocationRepository: CreditNoteAllocationRepository,
    creditNoteRepository: SalesCreditNoteRepository,
    invoiceRepository: SalesInvoiceRepository,
    debitNoteRepository: SalesDebitNoteRepository,
    parsed: CreditNoteAllocationCreateInput,
    context: CreditNoteAllocationActionContext,
  ) {
    const creditNote = assertFound(await creditNoteRepository.getSalesCreditNoteById(parsed.tenantId, parsed.creditNoteId), "Sales credit note");
    assertPermission(context, permissions.create, creditNote);
    if (creditNote.status !== "POSTED") throw new Error("Only POSTED credit notes can be allocated");
    if (roundMoney(parsed.amount) > roundMoney(creditNote.availableAmount)) throw new Error("Allocation cannot exceed available credit note amount");
    let customerId = creditNote.customerId;
    if (parsed.targetType === "SALES_INVOICE") {
      const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(parsed.tenantId, parsed.targetId), "Sales invoice");
      if (invoice.customerId !== customerId) throw new Error("Allocation target must belong to the same customer");
      if (invoice.status !== "ISSUED" || invoice.accountingStatus !== "POSTED") throw new Error("Credit can only be allocated to issued, accounting-posted invoices");
      if (roundMoney(parsed.amount) > roundMoney(invoice.amountDue)) throw new Error("Allocation cannot exceed invoice amount due");
      assertFound(await creditNoteRepository.applyCreditNoteAllocation(parsed.tenantId, creditNote.id, parsed.amount, context.actorId), "Sales credit note");
      assertFound(await invoiceRepository.applySalesInvoiceCreditAllocation(parsed.tenantId, invoice.id, parsed.amount, context.actorId), "Sales invoice");
    } else {
      const debitNote = assertFound(await debitNoteRepository.getSalesDebitNoteById(parsed.tenantId, parsed.targetId), "Sales debit note");
      if (debitNote.customerId !== customerId) throw new Error("Allocation target must belong to the same customer");
      if (debitNote.status !== "POSTED") throw new Error("Credit can only be allocated to posted debit notes");
      if (roundMoney(parsed.amount) > roundMoney(debitNote.amountDue)) throw new Error("Allocation cannot exceed debit note amount due");
      assertFound(await creditNoteRepository.applyCreditNoteAllocation(parsed.tenantId, creditNote.id, parsed.amount, context.actorId), "Sales credit note");
      assertFound(await debitNoteRepository.applySalesDebitNoteCreditAllocation(parsed.tenantId, debitNote.id, parsed.amount, context.actorId), "Sales debit note");
    }
    const allocation = await allocationRepository.createCreditNoteAllocation({ ...parsed, companyId: parsed.companyId ?? creditNote.companyId, branchId: parsed.branchId ?? creditNote.branchId, customerId }, context.actorId);
    createAuditEvent("allocated", parsed.tenantId, allocation.id, context.actorId, { event: events.allocated, creditNoteId: creditNote.id, targetType: parsed.targetType, targetId: parsed.targetId });
    return allocation;
  }

  return {
    async allocate(input: unknown, context: CreditNoteAllocationActionContext) {
      const parsed = creditNoteAllocationCreateSchema.parse(input) as CreditNoteAllocationCreateInput;
      if (repository === creditNoteAllocationsRepository && creditNotes === salesCreditNotesRepository && invoices === salesInvoicesRepository && debitNotes === salesDebitNotesRepository) {
        return getTenantKnex().transaction((trx) => allocateWith(createCreditNoteAllocationsRepository(trx), createSalesCreditNotesRepository(trx), createSalesInvoicesRepository(trx), createSalesDebitNotesRepository(trx), parsed, context));
      }
      return allocateWith(repository, creditNotes, invoices, debitNotes, parsed, context);
    },
    async list(input: unknown, context: CreditNoteAllocationActionContext) {
      const parsed = creditNoteAllocationListSchema.parse(input);
      assertPermission(context, permissions.view);
      return repository.listCreditNoteAllocations(parsed);
    },
    async getByCreditNote(tenantId: string, creditNoteId: string, context: CreditNoteAllocationActionContext) {
      assertPermission(context, permissions.view);
      return repository.getCreditNoteAllocations(tenantId, creditNoteId);
    },
    async getByInvoice(tenantId: string, invoiceId: string, context: CreditNoteAllocationActionContext) {
      assertPermission(context, permissions.view);
      return repository.getInvoiceCreditAllocations(tenantId, invoiceId);
    },
    async getByDebitNote(tenantId: string, debitNoteId: string, context: CreditNoteAllocationActionContext) {
      assertPermission(context, permissions.view);
      return repository.getDebitNoteCreditAllocations(tenantId, debitNoteId);
    },
  };
}

export const creditNoteAllocationsService = createCreditNoteAllocationsService();
