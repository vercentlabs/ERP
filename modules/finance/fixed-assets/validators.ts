import { fixedAssetsCreateSchema, fixedAssetsListSchema, fixedAssetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => fixedAssetsCreateSchema.safeParse(input),
  update: (input: unknown) => fixedAssetsUpdateSchema.safeParse(input),
  list: (input: unknown) => fixedAssetsListSchema.safeParse(input),
};
