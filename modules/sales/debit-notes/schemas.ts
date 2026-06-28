import { z } from "zod";
import { salesDebitNoteAccountingStatuses, salesDebitNoteStatuses } from "./types";

const optionalText = z.string().trim().min(1).optional();
const lineSchema = z.object({
  salesInvoiceLineId: optionalText,
  itemId: z.string().uuid(),
  itemName: optionalText,
  description: optionalText,
  quantity: z.coerce.number().positive(),
  uomId: z.string().uuid(),
  unitAmount: z.coerce.number().nonnegative(),
  taxRate: z.coerce.number().min(0).optional(),
});

export const salesDebitNoteCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  debitNoteNumber: optionalText,
  salesInvoiceId: z.string().uuid(),
  debitNoteDate: optionalText,
  postingDate: optionalText,
  reason: optionalText,
  notes: optionalText,
  lines: z.array(lineSchema).min(1),
});

export const salesDebitNoteUpdateSchema = salesDebitNoteCreateSchema
  .omit({ tenantId: true, debitNoteNumber: true, salesInvoiceId: true })
  .partial()
  .extend({ lines: z.array(lineSchema).min(1).optional() });

export const salesDebitNoteListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  search: optionalText,
  status: z.enum(salesDebitNoteStatuses).optional(),
  accountingStatus: z.enum(salesDebitNoteAccountingStatuses).optional(),
  customerId: optionalText,
  salesInvoiceId: optionalText,
  debitNoteDateFrom: optionalText,
  debitNoteDateTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "debit_note_date", "posting_date", "total_amount"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const postSalesDebitNoteSchema = z.object({ postingDate: optionalText });
export const createSalesDebitNoteFromInvoiceSchema = salesDebitNoteCreateSchema.omit({ tenantId: true, salesInvoiceId: true }).partial({ lines: true }).extend({ tenantId: z.string().min(1), lines: z.array(lineSchema).min(1).optional() });

export const debitNotesCreateSchema = salesDebitNoteCreateSchema;
export const debitNotesUpdateSchema = salesDebitNoteUpdateSchema;
export const debitNotesListSchema = salesDebitNoteListSchema;
