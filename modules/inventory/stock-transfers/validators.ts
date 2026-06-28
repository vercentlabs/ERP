import { stockTransfersCreateSchema, stockTransfersListSchema, stockTransfersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => stockTransfersCreateSchema.safeParse(input),
  update: (input: unknown) => stockTransfersUpdateSchema.safeParse(input),
  list: (input: unknown) => stockTransfersListSchema.safeParse(input),
};
