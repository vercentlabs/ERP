import { taxComplianceCreateSchema, taxComplianceListSchema, taxComplianceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => taxComplianceCreateSchema.safeParse(input),
  update: (input: unknown) => taxComplianceUpdateSchema.safeParse(input),
  list: (input: unknown) => taxComplianceListSchema.safeParse(input),
};
