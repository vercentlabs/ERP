import { fiscalYearsCreateSchema, fiscalYearsListSchema, fiscalYearsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => fiscalYearsCreateSchema.safeParse(input),
  update: (input: unknown) => fiscalYearsUpdateSchema.safeParse(input),
  list: (input: unknown) => fiscalYearsListSchema.safeParse(input),
};
