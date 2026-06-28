import { vendorBillsCreateSchema, vendorBillsListSchema, vendorBillsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => vendorBillsCreateSchema.safeParse(input),
  update: (input: unknown) => vendorBillsUpdateSchema.safeParse(input),
  list: (input: unknown) => vendorBillsListSchema.safeParse(input),
};
