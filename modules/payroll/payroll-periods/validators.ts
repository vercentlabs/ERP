import { payrollPeriodsCreateSchema, payrollPeriodsListSchema, payrollPeriodsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => payrollPeriodsCreateSchema.safeParse(input),
  update: (input: unknown) => payrollPeriodsUpdateSchema.safeParse(input),
  list: (input: unknown) => payrollPeriodsListSchema.safeParse(input),
};
