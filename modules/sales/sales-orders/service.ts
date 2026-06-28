import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { opportunitiesRepository } from "../../crm/opportunities/repository";
import type { OpportunityRepository } from "../../crm/opportunities/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { quotationsRepository } from "../quotations/repository";
import type { QuotationRepository } from "../quotations/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { calculateLine, salesOrdersRepository } from "./repository";
import {
  createSalesOrderFromQuotationSchema,
  salesOrderCreateSchema,
  salesOrderListSchema,
  salesOrderStatusChangeSchema,
  salesOrderUpdateSchema,
} from "./schemas";
import type {
  CreateSalesOrderFromQuotationInput,
  SalesOrderActionContext,
  SalesOrderCreateInput,
  SalesOrderLineInput,
  SalesOrderLineRecord,
  SalesOrderListRequest,
  SalesOrderRecord,
  SalesOrderRepository,
  SalesOrderStatus,
  SalesOrderStatusChangeInput,
  SalesOrderUpdateInput,
} from "./types";

const allowedTransitions: Record<SalesOrderStatus, SalesOrderStatus[]> = {
  DRAFT: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CLOSED", "CANCELLED"],
  CANCELLED: [],
  CLOSED: [],
};

const terminalStatuses: SalesOrderStatus[] = ["CONFIRMED", "CANCELLED", "CLOSED"];

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: SalesOrderActionContext, permission: string, record?: SalesOrderRecord) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

const assertEditable = (order: SalesOrderRecord) => {
  if (terminalStatuses.includes(order.status)) throw new Error("Confirmed or terminal sales orders cannot be edited");
};

const assertTransition = (from: SalesOrderStatus, to: SalesOrderStatus) => {
  if (!allowedTransitions[from].includes(to)) throw new Error(`Sales order status transition ${from} -> ${to} is not allowed`);
};

export function createSalesOrdersService(
  repository: SalesOrderRepository = salesOrdersRepository,
  masterData: MasterDataRepository = masterDataRepository,
  opportunities: OpportunityRepository = opportunitiesRepository,
  quotations: QuotationRepository = quotationsRepository,
) {
  async function normalizeHeader(input: SalesOrderCreateInput | SalesOrderUpdateInput, tenantId: string) {
    if (!input.customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, input.customerId), "Customer");
    if (input.opportunityId) {
      const opportunity = assertFound(await opportunities.getOpportunityById(tenantId, input.opportunityId), "Opportunity");
      if (opportunity.customerId !== input.customerId) throw new Error("Sales order customer must match opportunity customer");
    }
    if (input.quotationId) {
      const quotation = assertFound(await quotations.getQuotationById(tenantId, input.quotationId), "Quotation");
      if (quotation.customerId !== input.customerId) throw new Error("Sales order customer must match quotation customer");
    }
    return { ...input, partyId: input.partyId ?? customer.partyId, currency: input.currency ?? customer.currency ?? "INR" };
  }

  async function buildLines(tenantId: string, inputLines: SalesOrderLineInput[]) {
    const lines: SalesOrderLineRecord[] = [];
    for (const [index, input] of inputLines.entries()) {
      const item = assertFound(await masterData.getItemById(tenantId, input.itemId), "Item");
      assertFound(await masterData.getUomById(tenantId, input.uomId), "UOM");
      lines.push(
        calculateLine({
          id: crypto.randomUUID(),
          orderId: "",
          quotationLineId: input.quotationLineId,
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
    async list(input: unknown, context?: SalesOrderActionContext) {
      const parsed = salesOrderListSchema.parse(input) as SalesOrderListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listSalesOrders(parsed);
    },

    async stats(input: unknown, context: SalesOrderActionContext) {
      const parsed = salesOrderListSchema.pick({ tenantId: true, companyId: true, branchId: true, ownerUserId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getSalesOrderStats(parsed.tenantId, parsed);
    },

    async getById(tenantId: string, id: string, context: SalesOrderActionContext) {
      const record = assertFound(await repository.getSalesOrderById(tenantId, id), "Sales order");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async getByNumber(tenantId: string, number: string, context: SalesOrderActionContext, companyId?: string) {
      const record = assertFound(await repository.getSalesOrderByNumber(tenantId, number, companyId), "Sales order");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async create(input: unknown, context: SalesOrderActionContext) {
      const parsed = salesOrderCreateSchema.parse(input) as SalesOrderCreateInput;
      assertPermission(context, permissions.create);
      if (parsed.quotationId) {
        const quotation = assertFound(await quotations.getQuotationById(parsed.tenantId, parsed.quotationId), "Quotation");
        if (quotation.status !== "ACCEPTED") throw new Error("Only ACCEPTED quotations can be converted to sales orders");
        if (quotation.customerId !== parsed.customerId) throw new Error("Sales order customer must match quotation customer");
        if (await repository.getSalesOrderByQuotationId(parsed.tenantId, parsed.quotationId)) throw new Error("Quotation already has a linked sales order");
        const inputLines: SalesOrderLineInput[] = quotation.lines.map((line) => ({
          quotationLineId: line.id,
          itemId: line.itemId,
          itemName: line.itemName,
          description: line.description,
          quantity: line.quantity,
          uomId: line.uomId,
          unitPrice: line.unitPrice,
          discountPercent: line.discountPercent,
          taxRate: line.taxRate,
        }));
        const lines = await buildLines(parsed.tenantId, inputLines);
        const totals = repository.calculateSalesOrderTotals(lines);
        const created = await repository.createSalesOrder(
          {
            ...parsed,
            opportunityId: parsed.opportunityId ?? quotation.opportunityId,
            partyId: parsed.partyId ?? quotation.partyId,
            currency: parsed.currency ?? quotation.currency,
            exchangeRate: parsed.exchangeRate ?? quotation.exchangeRate,
            priceListId: parsed.priceListId ?? quotation.priceListId,
            billingAddressId: parsed.billingAddressId ?? quotation.billingAddressId,
            shippingAddressId: parsed.shippingAddressId ?? quotation.shippingAddressId,
            terms: parsed.terms ?? quotation.terms,
            notes: parsed.notes ?? quotation.notes,
            ownerUserId: parsed.ownerUserId ?? quotation.ownerUserId,
            assignedTeamId: parsed.assignedTeamId ?? quotation.assignedTeamId,
            lines: inputLines,
          },
          lines,
          totals,
          context.actorId,
        );
        createAuditEvent("createdFromQuotation", created.tenantId, created.id, context.actorId, { event: events.createdFromQuotation, quotationId: parsed.quotationId });
        return created;
      }
      const normalized = (await normalizeHeader(parsed, parsed.tenantId)) as SalesOrderCreateInput;
      const lines = await buildLines(parsed.tenantId, parsed.lines);
      const totals = repository.calculateSalesOrderTotals(lines);
      const created = await repository.createSalesOrder(normalized, lines, totals, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },

    async createFromQuotation(tenantId: string, quotationId: string, input: unknown, context: SalesOrderActionContext) {
      const parsed = createSalesOrderFromQuotationSchema.parse({ tenantId, ...(input as object) }) as CreateSalesOrderFromQuotationInput;
      assertPermission(context, permissions.convertFromQuotation);
      const quotation = assertFound(await quotations.getQuotationById(tenantId, quotationId), "Quotation");
      if (quotation.status !== "ACCEPTED") throw new Error("Only ACCEPTED quotations can be converted to sales orders");
      if (await repository.getSalesOrderByQuotationId(tenantId, quotationId)) throw new Error("Quotation already has a linked sales order");
      const inputLines: SalesOrderLineInput[] = quotation.lines.map((line) => ({
        quotationLineId: line.id,
        itemId: line.itemId,
        itemName: line.itemName,
        description: line.description,
        quantity: line.quantity,
        uomId: line.uomId,
        unitPrice: line.unitPrice,
        discountPercent: line.discountPercent,
        taxRate: line.taxRate,
      }));
      const lines = await buildLines(tenantId, inputLines);
      const totals = repository.calculateSalesOrderTotals(lines);
      const created = await repository.createSalesOrderFromQuotation(
        {
          tenantId,
          companyId: quotation.companyId,
          branchId: quotation.branchId,
          quotationId,
          opportunityId: quotation.opportunityId,
          customerId: quotation.customerId,
          partyId: quotation.partyId,
          orderDate: parsed.orderDate,
          expectedDeliveryDate: parsed.expectedDeliveryDate,
          currency: quotation.currency,
          exchangeRate: quotation.exchangeRate,
          priceListId: quotation.priceListId,
          billingAddressId: quotation.billingAddressId,
          shippingAddressId: quotation.shippingAddressId,
          terms: quotation.terms,
          notes: parsed.notes ?? quotation.notes,
          ownerUserId: quotation.ownerUserId,
          assignedTeamId: quotation.assignedTeamId,
          lines: inputLines,
        },
        lines,
        totals,
        context.actorId,
      );
      createAuditEvent("createdFromQuotation", created.tenantId, created.id, context.actorId, { event: events.createdFromQuotation, quotationId });
      return created;
    },

    async update(tenantId: string, id: string, input: unknown, context: SalesOrderActionContext) {
      const current = assertFound(await repository.getSalesOrderById(tenantId, id), "Sales order");
      assertPermission(context, permissions.update, current);
      assertEditable(current);
      const parsed = salesOrderUpdateSchema.parse(input) as SalesOrderUpdateInput;
      if (parsed.status && parsed.status !== current.status) throw new Error("Use the status endpoint to change sales order status");
      const normalized = (await normalizeHeader(parsed, tenantId)) as SalesOrderUpdateInput;
      const lines = parsed.lines ? await buildLines(tenantId, parsed.lines) : undefined;
      const totals = lines ? repository.calculateSalesOrderTotals(lines) : undefined;
      const updated = assertFound(await repository.updateSalesOrder(tenantId, id, normalized, lines, totals, context.actorId), "Sales order");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },

    async softDelete(tenantId: string, id: string, context: SalesOrderActionContext) {
      const current = assertFound(await repository.getSalesOrderById(tenantId, id), "Sales order");
      assertPermission(context, permissions.delete, current);
      if (current.status === "CONFIRMED" || current.status === "CLOSED") throw new Error("Confirmed or closed sales orders cannot be deleted");
      const deleted = assertFound(await repository.softDeleteSalesOrder(tenantId, id, context.actorId), "Sales order");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },

    async changeStatus(tenantId: string, id: string, input: unknown, context: SalesOrderActionContext) {
      const current = assertFound(await repository.getSalesOrderById(tenantId, id), "Sales order");
      assertPermission(context, permissions.changeStatus, current);
      const parsed = salesOrderStatusChangeSchema.parse(input) as SalesOrderStatusChangeInput;
      assertTransition(current.status, parsed.status);
      const updated = assertFound(await repository.changeSalesOrderStatus(tenantId, id, parsed, context.actorId), "Sales order");
      createAuditEvent("statusChanged", tenantId, id, context.actorId, { event: events.statusChanged, from: current.status, to: updated.status });
      if (updated.status === "CONFIRMED") createAuditEvent("confirmed", tenantId, id, context.actorId, { event: events.confirmed });
      if (updated.status === "CANCELLED") createAuditEvent("cancelled", tenantId, id, context.actorId, { event: events.cancelled });
      if (updated.status === "CLOSED") createAuditEvent("closed", tenantId, id, context.actorId, { event: events.closed });
      return updated;
    },

    async getLines(tenantId: string, id: string, context: SalesOrderActionContext) {
      const current = assertFound(await repository.getSalesOrderById(tenantId, id), "Sales order");
      assertPermission(context, permissions.view, current);
      return repository.getSalesOrderLines(tenantId, id);
    },
  };
}

export const salesOrdersService = createSalesOrdersService();
