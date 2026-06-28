import { embeddedAnalyticsCreateSchema, embeddedAnalyticsListSchema, embeddedAnalyticsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => embeddedAnalyticsCreateSchema.safeParse(input),
  update: (input: unknown) => embeddedAnalyticsUpdateSchema.safeParse(input),
  list: (input: unknown) => embeddedAnalyticsListSchema.safeParse(input),
};
