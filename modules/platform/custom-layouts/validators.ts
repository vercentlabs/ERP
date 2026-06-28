import { customLayoutsCreateSchema, customLayoutsListSchema, customLayoutsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customLayoutsCreateSchema.safeParse(input),
  update: (input: unknown) => customLayoutsUpdateSchema.safeParse(input),
  list: (input: unknown) => customLayoutsListSchema.safeParse(input),
};
