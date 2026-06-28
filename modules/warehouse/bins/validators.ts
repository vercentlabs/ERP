import { binsCreateSchema, binsListSchema, binsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => binsCreateSchema.safeParse(input),
  update: (input: unknown) => binsUpdateSchema.safeParse(input),
  list: (input: unknown) => binsListSchema.safeParse(input),
};
