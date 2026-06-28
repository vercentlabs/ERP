import { projectExpensesCreateSchema, projectExpensesListSchema, projectExpensesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectExpensesCreateSchema.safeParse(input),
  update: (input: unknown) => projectExpensesUpdateSchema.safeParse(input),
  list: (input: unknown) => projectExpensesListSchema.safeParse(input),
};
