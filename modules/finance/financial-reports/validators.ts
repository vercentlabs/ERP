import { financialReportsCreateSchema, financialReportsListSchema, financialReportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => financialReportsCreateSchema.safeParse(input),
  update: (input: unknown) => financialReportsUpdateSchema.safeParse(input),
  list: (input: unknown) => financialReportsListSchema.safeParse(input),
};
