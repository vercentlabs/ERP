import { z } from "zod";

export const renewalsCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().nonnegative().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  dueDate: z.string().datetime().optional(),
  ownerId: z.string().optional(),
  source: z.string().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const renewalsUpdateSchema = renewalsCreateSchema.omit({ tenantId: true, code: true }).partial();

export const renewalsListSchema = z.object({
  tenantId: z.string().min(1),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(200).default(50),
  search: z.string().optional(),
  status: z.enum(["draft", "submitted", "approved", "rejected", "cancelled", "closed"]).optional(),
  ownerId: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
});
