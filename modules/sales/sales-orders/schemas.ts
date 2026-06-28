import { z } from "zod";

const optionalText = z.string().trim().min(1).optional();
const dateText = z.string().trim().min(1);
const numberValue = z.coerce.number();

export const salesOrderStatusSchema = z.enum(["DRAFT", "CONFIRMED", "CANCELLED", "CLOSED"]);

export const salesOrderLineInputSchema = z.object({
  quotationLineId: optionalText,
  itemId: z.string().trim().min(1),
  itemName: optionalText,
  description: z.string().optional(),
  quantity: numberValue.positive(),
  uomId: z.string().trim().min(1),
  unitPrice: numberValue.nonnegative(),
  discountPercent: numberValue.min(0).max(100).default(0),
  taxRate: numberValue.min(0).default(0),
});

export const salesOrderCreateSchema = z.object({
  tenantId: z.string().trim().min(1),
  companyId: optionalText,
  branchId: optionalText,
  orderNumber: optionalText,
  quotationId: optionalText,
  opportunityId: optionalText,
  customerId: z.string().trim().min(1),
  partyId: optionalText,
  orderDate: dateText.optional(),
  expectedDeliveryDate: dateText.optional(),
  status: salesOrderStatusSchema.default("DRAFT"),
  currency: z.string().trim().min(1).default("INR"),
  exchangeRate: numberValue.positive().default(1),
  priceListId: optionalText,
  billingAddressId: optionalText,
  shippingAddressId: optionalText,
  terms: z.string().optional(),
  notes: z.string().optional(),
  ownerUserId: optionalText,
  assignedTeamId: optionalText,
  lines: z.array(salesOrderLineInputSchema).min(1),
});

export const salesOrderUpdateSchema = salesOrderCreateSchema.omit({ tenantId: true, orderNumber: true }).partial();

export const salesOrderListSchema = z.object({
  tenantId: z.string().trim().min(1),
  companyId: optionalText,
  branchId: optionalText,
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
  search: z.string().optional(),
  status: salesOrderStatusSchema.optional(),
  customerId: optionalText,
  quotationId: optionalText,
  opportunityId: optionalText,
  ownerUserId: optionalText,
  orderDateFrom: optionalText,
  orderDateTo: optionalText,
  expectedDeliveryFrom: optionalText,
  expectedDeliveryTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "order_date", "expected_delivery_date", "total_amount"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const salesOrderStatusChangeSchema = z.object({
  status: salesOrderStatusSchema,
});

export const createSalesOrderFromQuotationSchema = z.object({
  tenantId: z.string().trim().min(1),
  orderDate: dateText.optional(),
  expectedDeliveryDate: dateText.optional(),
  notes: z.string().optional(),
});

export const salesOrdersCreateSchema = salesOrderCreateSchema;
export const salesOrdersUpdateSchema = salesOrderUpdateSchema;
export const salesOrdersListSchema = salesOrderListSchema;
