import { wavesCreateSchema, wavesListSchema, wavesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => wavesCreateSchema.safeParse(input),
  update: (input: unknown) => wavesUpdateSchema.safeParse(input),
  list: (input: unknown) => wavesListSchema.safeParse(input),
};
