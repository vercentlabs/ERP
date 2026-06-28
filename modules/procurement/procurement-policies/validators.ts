import { procurementPoliciesCreateSchema, procurementPoliciesListSchema, procurementPoliciesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => procurementPoliciesCreateSchema.safeParse(input),
  update: (input: unknown) => procurementPoliciesUpdateSchema.safeParse(input),
  list: (input: unknown) => procurementPoliciesListSchema.safeParse(input),
};
