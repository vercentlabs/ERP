import { departmentsCreateSchema, departmentsListSchema, departmentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => departmentsCreateSchema.safeParse(input),
  update: (input: unknown) => departmentsUpdateSchema.safeParse(input),
  list: (input: unknown) => departmentsListSchema.safeParse(input),
};
