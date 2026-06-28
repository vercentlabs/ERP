import { budgetsCreateSchema, budgetsListSchema, budgetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => budgetsCreateSchema.safeParse(input),
  update: (input: unknown) => budgetsUpdateSchema.safeParse(input),
  list: (input: unknown) => budgetsListSchema.safeParse(input),
};
