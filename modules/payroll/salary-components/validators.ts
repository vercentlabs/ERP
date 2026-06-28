import { salaryComponentsCreateSchema, salaryComponentsListSchema, salaryComponentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => salaryComponentsCreateSchema.safeParse(input),
  update: (input: unknown) => salaryComponentsUpdateSchema.safeParse(input),
  list: (input: unknown) => salaryComponentsListSchema.safeParse(input),
};
