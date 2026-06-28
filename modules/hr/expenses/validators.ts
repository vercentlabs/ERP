import { expensesCreateSchema, expensesListSchema, expensesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => expensesCreateSchema.safeParse(input),
  update: (input: unknown) => expensesUpdateSchema.safeParse(input),
  list: (input: unknown) => expensesListSchema.safeParse(input),
};
