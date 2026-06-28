import { z } from "zod";
import { leadStatuses } from "./types";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const leadStatusSchema = z.enum(leadStatuses);

export const leadCreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  leadNumber: optionalText,
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  companyName: optionalText,
  email: z.string().trim().email().optional().or(z.literal("").transform(() => undefined)),
  phone: optionalText,
  source: optionalText,
  score: z.coerce.number().int().min(0).max(100).default(0),
  ownerUserId: optionalText,
  assignedTeamId: optionalText,
  expectedValue: z.coerce.number().nonnegative().optional(),
  currency: z.string().trim().min(3).max(3).default("INR"),
  notes: optionalText,
  tags: z.array(z.string().trim().min(1)).default([]),
  customFields: z.record(z.unknown()).default({}),
});

export const leadUpdateSchema = leadCreateSchema
  .omit({ tenantId: true, leadNumber: true })
  .partial()
  .extend({
    convertedCustomerId: z.string().trim().min(1).nullable().optional(),
    convertedOpportunityId: z.string().trim().min(1).nullable().optional(),
  });

export const leadListSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
  search: optionalText,
  status: leadStatusSchema.optional(),
  ownerUserId: optionalText,
  source: optionalText,
  createdFrom: optionalText,
  createdTo: optionalText,
  sortBy: z.enum(["created_at", "updated_at", "score", "expected_value"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const leadStatusChangeSchema = z.object({
  status: leadStatusSchema,
  convertedCustomerId: optionalText,
  convertedOpportunityId: optionalText,
});

export const leadAssignmentSchema = z
  .object({
    ownerUserId: optionalText,
    assignedTeamId: optionalText,
  })
  .refine((input) => input.ownerUserId || input.assignedTeamId, {
    message: "ownerUserId or assignedTeamId is required",
  });

export const leadDeleteSchema = z.object({
  tenantId: z.string().min(1),
  id: z.string().min(1),
});

export const leadConversionAddressSchema = z.object({
  line1: z.string().trim().min(1),
  line2: optionalText,
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  postalCode: z.string().trim().min(1),
  country: z.string().trim().min(2).default("IN"),
  gstStateCode: optionalText,
});

export const leadConversionSchema = z.object({
  partyType: z.enum(["INDIVIDUAL", "COMPANY"]).default("COMPANY"),
  displayName: z.string().trim().min(1),
  legalName: optionalText,
  gstin: optionalText,
  pan: optionalText,
  email: z.string().trim().email().optional().or(z.literal("").transform(() => undefined)),
  phone: optionalText,
  customerGroup: optionalText,
  paymentTerms: optionalText,
  currency: z.string().trim().min(3).max(3).default("INR"),
  gstTreatment: optionalText,
  billingAddress: leadConversionAddressSchema.optional(),
  shippingAddress: leadConversionAddressSchema.optional(),
  createOpportunity: z.coerce.boolean().default(false),
  opportunityName: optionalText,
  expectedValue: z.coerce.number().nonnegative().optional(),
  expectedCloseDate: optionalText,
  opportunitySource: optionalText,
  notes: optionalText,
});
