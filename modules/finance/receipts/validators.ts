import { receiptsCreateSchema, receiptsListSchema, receiptsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => receiptsCreateSchema.safeParse(input),
  update: (input: unknown) => receiptsUpdateSchema.safeParse(input),
  list: (input: unknown) => receiptsListSchema.safeParse(input),
};
