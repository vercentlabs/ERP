import { customFieldsCreateSchema, customFieldsListSchema, customFieldsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customFieldsCreateSchema.safeParse(input),
  update: (input: unknown) => customFieldsUpdateSchema.safeParse(input),
  list: (input: unknown) => customFieldsListSchema.safeParse(input),
};
