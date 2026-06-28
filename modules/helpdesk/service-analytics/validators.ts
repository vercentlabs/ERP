import { serviceAnalyticsCreateSchema, serviceAnalyticsListSchema, serviceAnalyticsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => serviceAnalyticsCreateSchema.safeParse(input),
  update: (input: unknown) => serviceAnalyticsUpdateSchema.safeParse(input),
  list: (input: unknown) => serviceAnalyticsListSchema.safeParse(input),
};
