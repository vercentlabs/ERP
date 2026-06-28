import { complianceDisclosuresCreateSchema, complianceDisclosuresListSchema, complianceDisclosuresUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => complianceDisclosuresCreateSchema.safeParse(input),
  update: (input: unknown) => complianceDisclosuresUpdateSchema.safeParse(input),
  list: (input: unknown) => complianceDisclosuresListSchema.safeParse(input),
};
