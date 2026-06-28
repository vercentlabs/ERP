import { namingSeriesCreateSchema, namingSeriesListSchema, namingSeriesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => namingSeriesCreateSchema.safeParse(input),
  update: (input: unknown) => namingSeriesUpdateSchema.safeParse(input),
  list: (input: unknown) => namingSeriesListSchema.safeParse(input),
};
