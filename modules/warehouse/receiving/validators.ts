import { receivingCreateSchema, receivingListSchema, receivingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => receivingCreateSchema.safeParse(input),
  update: (input: unknown) => receivingUpdateSchema.safeParse(input),
  list: (input: unknown) => receivingListSchema.safeParse(input),
};
