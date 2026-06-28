import { z } from "zod";

const optionalText = z.string().trim().min(1).optional();
const dateText = z.string().trim().min(1);
const numberValue = z.coerce.number();

export const quotationStatusSchema = z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"]);

export const quotationLineInputSchema = z.object({
  itemId: z.string().trim().min(1),
  itemName: optionalText,
  description: z.string().optional(),
  quantity: numberValue.positive(),
  uomId: z.string().trim().min(1),
  unitPrice: numberValue.nonnegative(),
  discountPercent: numberValue.min(0).max(100).default(0),
  taxRate: numberValue.min(0).default(0),
});

export const quotationCreateSchema = z.object({
  tenantId: z.string().trim().min(1),
  companyId: optionalText,
  branchId: optionalText,
  quotationNumber: optionalText,
  customerId: z.string().trim().min(1),
  partyId: optionalText,
  opportunityId: optionalText,
  quoteDate: dateText.optional(),
  validUntil: dateText,
  status: quotationStatusSchema.default("DRAFT"),
  currency: z.string().trim().min(1).default("INR"),
  exchangeRate: numberValue.positive().default(1),
  priceListId: optionalText,
  billingAddressId: optionalText,
  shippingAddressId: optionalText,
  terms: z.string().optional(),
  notes: z.string().optional(),
  ownerUserId: optionalText,
  assignedTeamId: optionalText,
  lines: z.array(quotationLineInputSchema).min(1),
});

export const quotationUpdateSchema = quotationCreateSchema.omit({ tenantId: true, quotationNumber: true }).partial();

export const quotationListSchema = z.object({
  tenantId: z.string().trim().min(1),
  companyId: optionalText,
  branchId: optionalText,
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
  search: z.string().optional(),
  status: quotationStatusSchema.optional(),
  customerId: optionalText,
  opportunityId: optionalText,
  ownerUserId: optionalText,
  quoteDateFrom: optionalText,
  quoteDateTo: optionalText,
  validUntilFrom: optionalText,
  validUntilTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "quote_date", "valid_until", "total_amount"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const quotationStatusChangeSchema = z.object({
  status: quotationStatusSchema,
  rejectionReason: z.string().optional(),
});

export const quotationsCreateSchema = quotationCreateSchema;
export const quotationsUpdateSchema = quotationUpdateSchema;
export const quotationsListSchema = quotationListSchema;
