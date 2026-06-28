import { retailCreateSchema, retailListSchema, retailUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => retailCreateSchema.safeParse(input),
  update: (input: unknown) => retailUpdateSchema.safeParse(input),
  list: (input: unknown) => retailListSchema.safeParse(input),
};
