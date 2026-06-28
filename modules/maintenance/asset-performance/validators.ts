import { assetPerformanceCreateSchema, assetPerformanceListSchema, assetPerformanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => assetPerformanceCreateSchema.safeParse(input),
  update: (input: unknown) => assetPerformanceUpdateSchema.safeParse(input),
  list: (input: unknown) => assetPerformanceListSchema.safeParse(input),
};
