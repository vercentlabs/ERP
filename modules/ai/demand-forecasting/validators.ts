import { demandForecastingCreateSchema, demandForecastingListSchema, demandForecastingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => demandForecastingCreateSchema.safeParse(input),
  update: (input: unknown) => demandForecastingUpdateSchema.safeParse(input),
  list: (input: unknown) => demandForecastingListSchema.safeParse(input),
};
