import { scheduledReportsCreateSchema, scheduledReportsListSchema, scheduledReportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => scheduledReportsCreateSchema.safeParse(input),
  update: (input: unknown) => scheduledReportsUpdateSchema.safeParse(input),
  list: (input: unknown) => scheduledReportsListSchema.safeParse(input),
};
