import { deferredRevenueCreateSchema, deferredRevenueListSchema, deferredRevenueUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => deferredRevenueCreateSchema.safeParse(input),
  update: (input: unknown) => deferredRevenueUpdateSchema.safeParse(input),
  list: (input: unknown) => deferredRevenueListSchema.safeParse(input),
};
