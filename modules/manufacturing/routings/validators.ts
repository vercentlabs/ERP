import { routingsCreateSchema, routingsListSchema, routingsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => routingsCreateSchema.safeParse(input),
  update: (input: unknown) => routingsUpdateSchema.safeParse(input),
  list: (input: unknown) => routingsListSchema.safeParse(input),
};
