import { metricsLayerCreateSchema, metricsLayerListSchema, metricsLayerUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => metricsLayerCreateSchema.safeParse(input),
  update: (input: unknown) => metricsLayerUpdateSchema.safeParse(input),
  list: (input: unknown) => metricsLayerListSchema.safeParse(input),
};
