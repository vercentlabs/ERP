import { assetsCreateSchema, assetsListSchema, assetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => assetsCreateSchema.safeParse(input),
  update: (input: unknown) => assetsUpdateSchema.safeParse(input),
  list: (input: unknown) => assetsListSchema.safeParse(input),
};
