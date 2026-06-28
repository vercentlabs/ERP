import { purchaseOrdersCreateSchema, purchaseOrdersListSchema, purchaseOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => purchaseOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => purchaseOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => purchaseOrdersListSchema.safeParse(input),
};
