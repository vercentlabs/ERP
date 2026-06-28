import { productRevisionsCreateSchema, productRevisionsListSchema, productRevisionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => productRevisionsCreateSchema.safeParse(input),
  update: (input: unknown) => productRevisionsUpdateSchema.safeParse(input),
  list: (input: unknown) => productRevisionsListSchema.safeParse(input),
};
