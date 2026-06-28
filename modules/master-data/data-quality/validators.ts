import { dataQualityCreateSchema, dataQualityListSchema, dataQualityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataQualityCreateSchema.safeParse(input),
  update: (input: unknown) => dataQualityUpdateSchema.safeParse(input),
  list: (input: unknown) => dataQualityListSchema.safeParse(input),
};
