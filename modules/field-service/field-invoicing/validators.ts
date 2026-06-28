import { fieldInvoicingCreateSchema, fieldInvoicingListSchema, fieldInvoicingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => fieldInvoicingCreateSchema.safeParse(input),
  update: (input: unknown) => fieldInvoicingUpdateSchema.safeParse(input),
  list: (input: unknown) => fieldInvoicingListSchema.safeParse(input),
};
