import { billingSchedulesCreateSchema, billingSchedulesListSchema, billingSchedulesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => billingSchedulesCreateSchema.safeParse(input),
  update: (input: unknown) => billingSchedulesUpdateSchema.safeParse(input),
  list: (input: unknown) => billingSchedulesListSchema.safeParse(input),
};
