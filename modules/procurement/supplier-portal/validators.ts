import { supplierPortalCreateSchema, supplierPortalListSchema, supplierPortalUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => supplierPortalCreateSchema.safeParse(input),
  update: (input: unknown) => supplierPortalUpdateSchema.safeParse(input),
  list: (input: unknown) => supplierPortalListSchema.safeParse(input),
};
