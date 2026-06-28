import { cashFlowForecastingCreateSchema, cashFlowForecastingListSchema, cashFlowForecastingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => cashFlowForecastingCreateSchema.safeParse(input),
  update: (input: unknown) => cashFlowForecastingUpdateSchema.safeParse(input),
  list: (input: unknown) => cashFlowForecastingListSchema.safeParse(input),
};
