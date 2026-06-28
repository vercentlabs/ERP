import { formulaFieldsCreateSchema, formulaFieldsListSchema, formulaFieldsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => formulaFieldsCreateSchema.safeParse(input),
  update: (input: unknown) => formulaFieldsUpdateSchema.safeParse(input),
  list: (input: unknown) => formulaFieldsListSchema.safeParse(input),
};
