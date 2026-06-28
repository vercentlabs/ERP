import { employeesCreateSchema, employeesListSchema, employeesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => employeesCreateSchema.safeParse(input),
  update: (input: unknown) => employeesUpdateSchema.safeParse(input),
  list: (input: unknown) => employeesListSchema.safeParse(input),
};
