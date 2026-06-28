import { manufacturingAnalyticsCreateSchema, manufacturingAnalyticsListSchema, manufacturingAnalyticsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => manufacturingAnalyticsCreateSchema.safeParse(input),
  update: (input: unknown) => manufacturingAnalyticsUpdateSchema.safeParse(input),
  list: (input: unknown) => manufacturingAnalyticsListSchema.safeParse(input),
};
