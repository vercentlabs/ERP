import { customerAssetsCreateSchema, customerAssetsListSchema, customerAssetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customerAssetsCreateSchema.safeParse(input),
  update: (input: unknown) => customerAssetsUpdateSchema.safeParse(input),
  list: (input: unknown) => customerAssetsListSchema.safeParse(input),
};
