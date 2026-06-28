import { suppliersCreateSchema, suppliersListSchema, suppliersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => suppliersCreateSchema.safeParse(input),
  update: (input: unknown) => suppliersUpdateSchema.safeParse(input),
  list: (input: unknown) => suppliersListSchema.safeParse(input),
};
