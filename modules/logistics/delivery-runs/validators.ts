import { deliveryRunsCreateSchema, deliveryRunsListSchema, deliveryRunsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => deliveryRunsCreateSchema.safeParse(input),
  update: (input: unknown) => deliveryRunsUpdateSchema.safeParse(input),
  list: (input: unknown) => deliveryRunsListSchema.safeParse(input),
};
