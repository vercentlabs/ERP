import { commerceOrdersCreateSchema, commerceOrdersListSchema, commerceOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => commerceOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => commerceOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => commerceOrdersListSchema.safeParse(input),
};
