import { z } from "zod";
import { salesCreditNoteStatuses } from "./types";

const optionalText = z.string().trim().min(1).optional();
const lineSchema = z.object({
  salesInvoiceLineId: optionalText,
  itemId: z.string().uuid(),
  itemName: optionalText,
  description: optionalText,
  quantity: z.coerce.number().positive(),
  uomId: z.string().uuid(),
  unitPrice: z.coerce.number().nonnegative(),
  discountPercent: z.coerce.number().min(0).max(100).optional(),
  taxRate: z.coerce.number().min(0).optional(),
  hsnSacCode: optionalText,
});

export const salesCreditNoteCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  creditNoteNumber: optionalText,
  salesInvoiceId: z.string().uuid(),
  creditNoteDate: optionalText,
  postingDate: optionalText,
  reason: optionalText,
  returnToStock: z.coerce.boolean().optional(),
  warehouseId: optionalText,
  notes: optionalText,
  lines: z.array(lineSchema).min(1),
});

export const salesCreditNoteUpdateSchema = salesCreditNoteCreateSchema
  .omit({ tenantId: true, creditNoteNumber: true, salesInvoiceId: true })
  .partial()
  .extend({ lines: z.array(lineSchema).min(1).optional() });

export const salesCreditNoteListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  search: optionalText,
  status: z.enum(salesCreditNoteStatuses).optional(),
  customerId: optionalText,
  salesInvoiceId: optionalText,
  creditNoteDateFrom: optionalText,
  creditNoteDateTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "credit_note_date", "posting_date", "total_amount"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const postSalesCreditNoteSchema = z.object({ postingDate: optionalText });
export const createSalesCreditNoteFromInvoiceSchema = salesCreditNoteCreateSchema.omit({ tenantId: true, salesInvoiceId: true }).partial({ lines: true }).extend({ tenantId: z.string().min(1), lines: z.array(lineSchema).min(1).optional() });

export const creditNotesCreateSchema = salesCreditNoteCreateSchema;
export const creditNotesUpdateSchema = salesCreditNoteUpdateSchema;
export const creditNotesListSchema = salesCreditNoteListSchema;
