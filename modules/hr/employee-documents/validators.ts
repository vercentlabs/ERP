import { employeeDocumentsCreateSchema, employeeDocumentsListSchema, employeeDocumentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => employeeDocumentsCreateSchema.safeParse(input),
  update: (input: unknown) => employeeDocumentsUpdateSchema.safeParse(input),
  list: (input: unknown) => employeeDocumentsListSchema.safeParse(input),
};
