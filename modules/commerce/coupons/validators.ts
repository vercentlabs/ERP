import { couponsCreateSchema, couponsListSchema, couponsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => couponsCreateSchema.safeParse(input),
  update: (input: unknown) => couponsUpdateSchema.safeParse(input),
  list: (input: unknown) => couponsListSchema.safeParse(input),
};
