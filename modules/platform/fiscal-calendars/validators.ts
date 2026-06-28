import { fiscalCalendarsCreateSchema, fiscalCalendarsListSchema, fiscalCalendarsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => fiscalCalendarsCreateSchema.safeParse(input),
  update: (input: unknown) => fiscalCalendarsUpdateSchema.safeParse(input),
  list: (input: unknown) => fiscalCalendarsListSchema.safeParse(input),
};
