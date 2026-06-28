import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const positiveNumber = z.coerce.number().positive();
const pageNumber = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);

export const deliveryNoteLineInputSchema = z.object({
  salesOrderLineId: z.string().uuid(),
  quantity: positiveNumber,
  warehouseId: z.string().uuid().optional(),
  binId: z.string().uuid().optional(),
});

export const deliveryNoteCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  deliveryNoteNumber: z.string().min(1).optional(),
  salesOrderId: z.string().uuid(),
  deliveryDate: optionalDate,
  shippingAddressId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  carrierName: z.string().optional(),
  trackingNumber: z.string().optional(),
  vehicleNumber: z.string().optional(),
  ewayBillNumber: z.string().optional(),
  notes: z.string().optional(),
  lines: z.array(deliveryNoteLineInputSchema).min(1),
});

export const createDeliveryNoteFromSalesOrderSchema = z.object({
  tenantId: z.string().min(1),
  deliveryDate: optionalDate,
  shippingAddressId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  carrierName: z.string().optional(),
  trackingNumber: z.string().optional(),
  vehicleNumber: z.string().optional(),
  ewayBillNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const deliveryNoteUpdateSchema = deliveryNoteCreateSchema.omit({ tenantId: true, salesOrderId: true, deliveryNoteNumber: true }).partial().extend({
  lines: z.array(deliveryNoteLineInputSchema).min(1).optional(),
});

export const deliveryNoteListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  page: pageNumber,
  pageSize,
  search: z.string().optional(),
  status: z.enum(["DRAFT", "POSTED", "CANCELLED"]).optional(),
  customerId: z.string().uuid().optional(),
  salesOrderId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  deliveryDateFrom: optionalDate,
  deliveryDateTo: optionalDate,
  postingDateFrom: optionalDate,
  postingDateTo: optionalDate,
  sortBy: z.enum(["created_at", "updated_at", "delivery_date", "posting_date"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const postDeliveryNoteSchema = z.object({
  postingDate: optionalDate,
});

export const cancelDeliveryNoteSchema = z.object({
  reason: z.string().optional(),
});

export const deliveryNotesCreateSchema = deliveryNoteCreateSchema;
export const deliveryNotesUpdateSchema = deliveryNoteUpdateSchema;
export const deliveryNotesListSchema = deliveryNoteListSchema;
