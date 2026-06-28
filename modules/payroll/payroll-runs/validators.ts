import { payrollRunsCreateSchema, payrollRunsListSchema, payrollRunsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => payrollRunsCreateSchema.safeParse(input),
  update: (input: unknown) => payrollRunsUpdateSchema.safeParse(input),
  list: (input: unknown) => payrollRunsListSchema.safeParse(input),
};
