import { forecastingCreateSchema, forecastingListSchema, forecastingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => forecastingCreateSchema.safeParse(input),
  update: (input: unknown) => forecastingUpdateSchema.safeParse(input),
  list: (input: unknown) => forecastingListSchema.safeParse(input),
};
