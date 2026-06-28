import { z } from "zod";
import { opportunityStages } from "./types";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const opportunityStageSchema = z.enum(opportunityStages);

const scopeSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
});

export const opportunityCreateSchema = scopeSchema.extend({
  opportunityNumber: optionalText,
  name: z.string().trim().min(1),
  customerId: z.string().trim().min(1),
  partyId: optionalText,
  leadId: optionalText,
  ownerUserId: optionalText,
  assignedTeamId: optionalText,
  stage: opportunityStageSchema.default("PROSPECTING"),
  probability: z.coerce.number().int().min(0).max(100).optional(),
  expectedValue: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().min(3).max(3).default("INR"),
  expectedCloseDate: optionalText,
  source: optionalText,
  lossReason: optionalText,
  notes: optionalText,
  tags: z.array(z.string().trim().min(1)).default([]),
  customFields: z.record(z.unknown()).default({}),
});

export const opportunityUpdateSchema = opportunityCreateSchema.omit({ tenantId: true, opportunityNumber: true }).partial();

export const opportunityListSchema = scopeSchema.extend({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
  search: optionalText,
  stage: opportunityStageSchema.optional(),
  customerId: optionalText,
  ownerUserId: optionalText,
  assignedTeamId: optionalText,
  source: optionalText,
  createdFrom: optionalText,
  createdTo: optionalText,
  expectedCloseFrom: optionalText,
  expectedCloseTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "expected_value", "expected_close_date", "probability"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const opportunityStageChangeSchema = z.object({
  stage: opportunityStageSchema,
  probability: z.coerce.number().int().min(0).max(100).optional(),
  lossReason: optionalText,
});

export const opportunityAssignmentSchema = z
  .object({
    ownerUserId: optionalText,
    assignedTeamId: optionalText,
  })
  .refine((input) => input.ownerUserId || input.assignedTeamId, {
    message: "ownerUserId or assignedTeamId is required",
  });

export const opportunitiesCreateSchema = opportunityCreateSchema;
export const opportunitiesUpdateSchema = opportunityUpdateSchema;
export const opportunitiesListSchema = opportunityListSchema;
