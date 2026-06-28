import { validationRulesCreateSchema, validationRulesListSchema, validationRulesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => validationRulesCreateSchema.safeParse(input),
  update: (input: unknown) => validationRulesUpdateSchema.safeParse(input),
  list: (input: unknown) => validationRulesListSchema.safeParse(input),
};
