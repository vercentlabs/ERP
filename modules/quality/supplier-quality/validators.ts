import { supplierQualityCreateSchema, supplierQualityListSchema, supplierQualityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => supplierQualityCreateSchema.safeParse(input),
  update: (input: unknown) => supplierQualityUpdateSchema.safeParse(input),
  list: (input: unknown) => supplierQualityListSchema.safeParse(input),
};
