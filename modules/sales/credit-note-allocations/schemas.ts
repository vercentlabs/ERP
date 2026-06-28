import { z } from "zod";
import { creditNoteAllocationTargetTypes } from "./types";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();

export const creditNoteAllocationCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  creditNoteId: z.string().uuid(),
  targetType: z.enum(creditNoteAllocationTargetTypes),
  targetId: z.string().uuid(),
  allocationDate: optionalDate,
  amount: z.coerce.number().positive(),
  notes: z.string().optional(),
});

export const creditNoteAllocationListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  creditNoteId: z.string().uuid().optional(),
  targetType: z.enum(creditNoteAllocationTargetTypes).optional(),
  targetId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
});
