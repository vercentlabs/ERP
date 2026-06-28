import { cartsCreateSchema, cartsListSchema, cartsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => cartsCreateSchema.safeParse(input),
  update: (input: unknown) => cartsUpdateSchema.safeParse(input),
  list: (input: unknown) => cartsListSchema.safeParse(input),
};
