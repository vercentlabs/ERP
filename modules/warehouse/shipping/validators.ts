import { shippingCreateSchema, shippingListSchema, shippingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => shippingCreateSchema.safeParse(input),
  update: (input: unknown) => shippingUpdateSchema.safeParse(input),
  list: (input: unknown) => shippingListSchema.safeParse(input),
};
