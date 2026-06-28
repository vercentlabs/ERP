import { billOfMaterialsCreateSchema, billOfMaterialsListSchema, billOfMaterialsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => billOfMaterialsCreateSchema.safeParse(input),
  update: (input: unknown) => billOfMaterialsUpdateSchema.safeParse(input),
  list: (input: unknown) => billOfMaterialsListSchema.safeParse(input),
};
