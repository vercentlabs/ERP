import { authCreateSchema, authListSchema, authUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => authCreateSchema.safeParse(input),
  update: (input: unknown) => authUpdateSchema.safeParse(input),
  list: (input: unknown) => authListSchema.safeParse(input),
};
