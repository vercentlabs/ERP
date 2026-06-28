import { salesTargetsCreateSchema, salesTargetsListSchema, salesTargetsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => salesTargetsCreateSchema.safeParse(input),
  update: (input: unknown) => salesTargetsUpdateSchema.safeParse(input),
  list: (input: unknown) => salesTargetsListSchema.safeParse(input),
};
