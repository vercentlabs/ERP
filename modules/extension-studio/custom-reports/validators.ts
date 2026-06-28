import { customReportsCreateSchema, customReportsListSchema, customReportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customReportsCreateSchema.safeParse(input),
  update: (input: unknown) => customReportsUpdateSchema.safeParse(input),
  list: (input: unknown) => customReportsListSchema.safeParse(input),
};
