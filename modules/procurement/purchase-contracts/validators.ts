import { purchaseContractsCreateSchema, purchaseContractsListSchema, purchaseContractsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => purchaseContractsCreateSchema.safeParse(input),
  update: (input: unknown) => purchaseContractsUpdateSchema.safeParse(input),
  list: (input: unknown) => purchaseContractsListSchema.safeParse(input),
};
