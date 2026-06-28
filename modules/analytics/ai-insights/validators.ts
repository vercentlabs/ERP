import { aiInsightsCreateSchema, aiInsightsListSchema, aiInsightsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => aiInsightsCreateSchema.safeParse(input),
  update: (input: unknown) => aiInsightsUpdateSchema.safeParse(input),
  list: (input: unknown) => aiInsightsListSchema.safeParse(input),
};
