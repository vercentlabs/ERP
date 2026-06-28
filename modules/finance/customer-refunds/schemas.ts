import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const page = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);
export const customerRefundStatusSchema = z.enum(["DRAFT", "POSTED", "CANCELLED"]);
export const refundPaymentMethodSchema = z.enum(["CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER"]);

export const customerRefundAllocationSchema = z.object({
  creditNoteId: z.string().uuid(),
  amount: z.coerce.number().positive(),
});

export const customerRefundCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  refundNumber: z.string().optional(),
  customerId: z.string().uuid(),
  partyId: z.string().uuid().optional(),
  refundDate: optionalDate,
  postingDate: optionalDate,
  paymentMethod: refundPaymentMethodSchema,
  depositAccountId: z.string().uuid(),
  totalAmount: z.coerce.number().positive(),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
  allocations: z.array(customerRefundAllocationSchema).min(1),
});

export const customerRefundUpdateSchema = customerRefundCreateSchema
  .omit({ tenantId: true, refundNumber: true })
  .partial()
  .extend({ allocations: z.array(customerRefundAllocationSchema).min(1).optional() });

export const customerRefundListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  page,
  pageSize,
  search: z.string().optional(),
  status: customerRefundStatusSchema.optional(),
  customerId: z.string().uuid().optional(),
  paymentMethod: refundPaymentMethodSchema.optional(),
  refundDateFrom: optionalDate,
  refundDateTo: optionalDate,
  postingDateFrom: optionalDate,
  postingDateTo: optionalDate,
  sortBy: z.enum(["created_at", "updated_at", "refund_date", "posting_date", "total_amount"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const postCustomerRefundSchema = z.object({ postingDate: optionalDate });
