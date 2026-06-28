import { salesOrdersCreateSchema, salesOrdersListSchema, salesOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => salesOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => salesOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => salesOrdersListSchema.safeParse(input),
};
