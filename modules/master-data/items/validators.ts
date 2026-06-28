import { itemsCreateSchema, itemsListSchema, itemsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => itemsCreateSchema.safeParse(input),
  update: (input: unknown) => itemsUpdateSchema.safeParse(input),
  list: (input: unknown) => itemsListSchema.safeParse(input),
};
