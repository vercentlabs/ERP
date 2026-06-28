import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const page = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);
export const customerReceiptStatusSchema = z.enum(["DRAFT", "POSTED", "CANCELLED"]);
export const paymentMethodSchema = z.enum(["CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER"]);

export const customerReceiptAllocationSchema = z.object({
  salesInvoiceId: z.string().uuid(),
  allocatedAmount: z.coerce.number().positive(),
});

export const customerReceiptCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  receiptNumber: z.string().optional(),
  customerId: z.string().uuid(),
  partyId: z.string().uuid().optional(),
  receiptDate: optionalDate,
  postingDate: optionalDate,
  paymentMethod: paymentMethodSchema,
  depositAccountId: z.string().uuid(),
  referenceNumber: z.string().optional(),
  referenceDate: optionalDate,
  amountReceived: z.coerce.number().positive(),
  currency: z.string().default("INR"),
  exchangeRate: z.coerce.number().positive().default(1),
  notes: z.string().optional(),
  allocations: z.array(customerReceiptAllocationSchema).min(1),
});

export const customerReceiptUpdateSchema = customerReceiptCreateSchema
  .omit({ tenantId: true, receiptNumber: true })
  .partial()
  .extend({ allocations: z.array(customerReceiptAllocationSchema).min(1).optional() });

export const customerReceiptListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  page,
  pageSize,
  search: z.string().optional(),
  status: customerReceiptStatusSchema.optional(),
  customerId: z.string().uuid().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  receiptDateFrom: optionalDate,
  receiptDateTo: optionalDate,
  postingDateFrom: optionalDate,
  postingDateTo: optionalDate,
  sortBy: z.enum(["created_at", "updated_at", "receipt_date", "posting_date", "amount_received"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const postCustomerReceiptSchema = z.object({ postingDate: optionalDate });
