import { pickingCreateSchema, pickingListSchema, pickingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => pickingCreateSchema.safeParse(input),
  update: (input: unknown) => pickingUpdateSchema.safeParse(input),
  list: (input: unknown) => pickingListSchema.safeParse(input),
};
