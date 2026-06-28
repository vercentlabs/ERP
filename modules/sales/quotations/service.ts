import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { opportunitiesRepository } from "../../crm/opportunities/repository";
import type { OpportunityRepository } from "../../crm/opportunities/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { calculateLine, quotationsRepository } from "./repository";
import { quotationCreateSchema, quotationListSchema, quotationStatusChangeSchema, quotationUpdateSchema } from "./schemas";
import type {
  QuotationActionContext,
  QuotationCreateInput,
  QuotationLineInput,
  QuotationLineRecord,
  QuotationListRequest,
  QuotationRecord,
  QuotationRepository,
  QuotationStatus,
  QuotationStatusChangeInput,
  QuotationUpdateInput,
} from "./types";

const allowedTransitions: Record<QuotationStatus, QuotationStatus[]> = {
  DRAFT: ["SENT", "CANCELLED"],
  SENT: ["ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"],
  ACCEPTED: [],
  REJECTED: [],
  EXPIRED: [],
  CANCELLED: [],
};

const terminalStatuses: QuotationStatus[] = ["ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"];

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: QuotationActionContext, permission: string, record?: QuotationRecord) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

const assertEditable = (quotation: QuotationRecord) => {
  if (terminalStatuses.includes(quotation.status)) throw new Error("Terminal quotations cannot be edited");
};

const assertTransition = (from: QuotationStatus, to: QuotationStatus) => {
  if (!allowedTransitions[from].includes(to)) throw new Error(`Quotation status transition ${from} -> ${to} is not allowed`);
};

export function createQuotationsService(
  repository: QuotationRepository = quotationsRepository,
  masterData: MasterDataRepository = masterDataRepository,
  opportunities: OpportunityRepository = opportunitiesRepository,
) {
  async function normalizeHeader(input: QuotationCreateInput | QuotationUpdateInput, tenantId: string) {
    const customerId = input.customerId;
    if (!customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, customerId), "Customer");
    if (input.opportunityId) {
      const opportunity = assertFound(await opportunities.getOpportunityById(tenantId, input.opportunityId), "Opportunity");
      if (opportunity.customerId !== customerId) throw new Error("Quotation customer must match opportunity customer");
    }
    return {
      ...input,
      partyId: input.partyId ?? customer.partyId,
      currency: input.currency ?? customer.currency ?? "INR",
    };
  }

  async function buildLines(tenantId: string, inputLines: QuotationLineInput[]) {
    const lines: QuotationLineRecord[] = [];
    for (const [index, input] of inputLines.entries()) {
      const item = assertFound(await masterData.getItemById(tenantId, input.itemId), "Item");
      assertFound(await masterData.getUomById(tenantId, input.uomId), "UOM");
      lines.push(
        calculateLine({
          id: crypto.randomUUID(),
          quotationId: "",
          lineNumber: index + 1,
          itemId: input.itemId,
          itemName: input.itemName ?? item.name,
          description: input.description ?? item.description,
          quantity: input.quantity,
          uomId: input.uomId,
          unitPrice: input.unitPrice,
          discountPercent: input.discountPercent ?? 0,
          taxRate: input.taxRate ?? 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );
    }
    return lines;
  }

  return {
    async list(input: unknown, context?: QuotationActionContext) {
      const parsed = quotationListSchema.parse(input) as QuotationListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listQuotations(parsed);
    },

    async stats(input: unknown, context: QuotationActionContext) {
      const parsed = quotationListSchema.pick({ tenantId: true, companyId: true, branchId: true, ownerUserId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getQuotationStats(parsed.tenantId, parsed);
    },

    async getById(tenantId: string, id: string, context: QuotationActionContext) {
      const record = assertFound(await repository.getQuotationById(tenantId, id), "Quotation");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async getByNumber(tenantId: string, number: string, context: QuotationActionContext, companyId?: string) {
      const record = assertFound(await repository.getQuotationByNumber(tenantId, number, companyId), "Quotation");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async create(input: unknown, context: QuotationActionContext) {
      const parsed = quotationCreateSchema.parse(input) as QuotationCreateInput;
      assertPermission(context, permissions.create);
      const normalized = (await normalizeHeader(parsed, parsed.tenantId)) as QuotationCreateInput;
      const lines = await buildLines(parsed.tenantId, parsed.lines);
      const totals = repository.calculateQuotationTotals(lines);
      const created = await repository.createQuotation(normalized, lines, totals, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },

    async update(tenantId: string, id: string, input: unknown, context: QuotationActionContext) {
      const current = assertFound(await repository.getQuotationById(tenantId, id), "Quotation");
      assertPermission(context, permissions.update, current);
      assertEditable(current);
      const parsed = quotationUpdateSchema.parse(input) as QuotationUpdateInput;
      if (parsed.status && parsed.status !== current.status) throw new Error("Use the status endpoint to change quotation status");
      const normalized = (await normalizeHeader(parsed, tenantId)) as QuotationUpdateInput;
      const lines = parsed.lines ? await buildLines(tenantId, parsed.lines) : undefined;
      const totals = lines ? repository.calculateQuotationTotals(lines) : undefined;
      const updated = assertFound(await repository.updateQuotation(tenantId, id, normalized, lines, totals, context.actorId), "Quotation");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },

    async softDelete(tenantId: string, id: string, context: QuotationActionContext) {
      const current = assertFound(await repository.getQuotationById(tenantId, id), "Quotation");
      assertPermission(context, permissions.delete, current);
      if (current.status === "ACCEPTED") throw new Error("Accepted quotations cannot be deleted");
      const deleted = assertFound(await repository.softDeleteQuotation(tenantId, id, context.actorId), "Quotation");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },

    async changeStatus(tenantId: string, id: string, input: unknown, context: QuotationActionContext) {
      const current = assertFound(await repository.getQuotationById(tenantId, id), "Quotation");
      assertPermission(context, permissions.changeStatus, current);
      const parsed = quotationStatusChangeSchema.parse(input) as QuotationStatusChangeInput;
      assertTransition(current.status, parsed.status);
      const updated = assertFound(await repository.changeQuotationStatus(tenantId, id, parsed, context.actorId), "Quotation");
      createAuditEvent("statusChanged", tenantId, id, context.actorId, { event: events.statusChanged, from: current.status, to: updated.status });
      const eventByStatus: Partial<Record<QuotationStatus, string>> = {
        SENT: events.sent,
        ACCEPTED: events.accepted,
        REJECTED: events.rejected,
        EXPIRED: events.expired,
        CANCELLED: events.cancelled,
      };
      if (eventByStatus[updated.status]) createAuditEvent("statusChanged", tenantId, id, context.actorId, { event: eventByStatus[updated.status] });
      return updated;
    },

    async getLines(tenantId: string, id: string, context: QuotationActionContext) {
      const current = assertFound(await repository.getQuotationById(tenantId, id), "Quotation");
      assertPermission(context, permissions.view, current);
      return repository.getQuotationLines(tenantId, id);
    },
  };
}

export const quotationsService = createQuotationsService();
