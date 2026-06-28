import { reportsCreateSchema, reportsListSchema, reportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => reportsCreateSchema.safeParse(input),
  update: (input: unknown) => reportsUpdateSchema.safeParse(input),
  list: (input: unknown) => reportsListSchema.safeParse(input),
};
