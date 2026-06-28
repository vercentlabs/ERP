import { storefrontCreateSchema, storefrontListSchema, storefrontUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => storefrontCreateSchema.safeParse(input),
  update: (input: unknown) => storefrontUpdateSchema.safeParse(input),
  list: (input: unknown) => storefrontListSchema.safeParse(input),
};
