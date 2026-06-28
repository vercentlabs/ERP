import { currencyMasterCreateSchema, currencyMasterListSchema, currencyMasterUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => currencyMasterCreateSchema.safeParse(input),
  update: (input: unknown) => currencyMasterUpdateSchema.safeParse(input),
  list: (input: unknown) => currencyMasterListSchema.safeParse(input),
};
