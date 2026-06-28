import { supplierSustainabilityCreateSchema, supplierSustainabilityListSchema, supplierSustainabilityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => supplierSustainabilityCreateSchema.safeParse(input),
  update: (input: unknown) => supplierSustainabilityUpdateSchema.safeParse(input),
  list: (input: unknown) => supplierSustainabilityListSchema.safeParse(input),
};
