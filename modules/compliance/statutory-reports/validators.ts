import { statutoryReportsCreateSchema, statutoryReportsListSchema, statutoryReportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => statutoryReportsCreateSchema.safeParse(input),
  update: (input: unknown) => statutoryReportsUpdateSchema.safeParse(input),
  list: (input: unknown) => statutoryReportsListSchema.safeParse(input),
};
