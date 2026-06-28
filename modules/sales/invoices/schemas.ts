import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const pageNumber = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);

export const salesInvoiceLineInputSchema = z.object({
  salesOrderLineId: z.string().uuid().optional(),
  deliveryNoteLineId: z.string().uuid().optional(),
  itemId: z.string().uuid(),
  itemName: z.string().optional(),
  description: z.string().optional(),
  quantity: z.coerce.number().positive(),
  uomId: z.string().uuid(),
  unitPrice: z.coerce.number().nonnegative(),
  discountPercent: z.coerce.number().min(0).max(100).default(0),
  taxRate: z.coerce.number().min(0).default(0),
  hsnSacCode: z.string().optional(),
});

export const salesInvoiceCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  customerId: z.string().uuid(),
  partyId: z.string().uuid().optional(),
  salesOrderId: z.string().uuid().optional(),
  deliveryNoteId: z.string().uuid().optional(),
  opportunityId: z.string().uuid().optional(),
  quotationId: z.string().uuid().optional(),
  invoiceDate: optionalDate,
  dueDate: optionalDate,
  currency: z.string().default("INR"),
  exchangeRate: z.coerce.number().positive().default(1),
  billingAddressId: z.string().uuid().optional(),
  shippingAddressId: z.string().uuid().optional(),
  placeOfSupply: z.string().optional(),
  gstTreatment: z.string().optional(),
  terms: z.string().optional(),
  notes: z.string().optional(),
  ownerUserId: z.string().optional(),
  assignedTeamId: z.string().optional(),
  lines: z.array(salesInvoiceLineInputSchema).min(1),
});

export const salesInvoiceUpdateSchema = salesInvoiceCreateSchema.omit({ tenantId: true, invoiceNumber: true }).partial().extend({
  lines: z.array(salesInvoiceLineInputSchema).min(1).optional(),
});

export const salesInvoiceListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  page: pageNumber,
  pageSize,
  search: z.string().optional(),
  status: z.enum(["DRAFT", "ISSUED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["UNPAID", "PARTIALLY_PAID", "PAID"]).optional(),
  customerId: z.string().uuid().optional(),
  salesOrderId: z.string().uuid().optional(),
  deliveryNoteId: z.string().uuid().optional(),
  invoiceDateFrom: optionalDate,
  invoiceDateTo: optionalDate,
  dueDateFrom: optionalDate,
  dueDateTo: optionalDate,
  sortBy: z.enum(["created_at", "updated_at", "invoice_date", "due_date", "total_amount", "amount_due"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const createSalesInvoiceFromDeliveryNoteSchema = z.object({ tenantId: z.string().min(1), invoiceDate: optionalDate, dueDate: optionalDate, terms: z.string().optional(), notes: z.string().optional() });
export const createSalesInvoiceFromSalesOrderSchema = createSalesInvoiceFromDeliveryNoteSchema;
export const issueSalesInvoiceSchema = z.object({ invoiceDate: optionalDate });
export const cancelSalesInvoiceSchema = z.object({ reason: z.string().optional() });

export const invoicesCreateSchema = salesInvoiceCreateSchema;
export const invoicesUpdateSchema = salesInvoiceUpdateSchema;
export const invoicesListSchema = salesInvoiceListSchema;
