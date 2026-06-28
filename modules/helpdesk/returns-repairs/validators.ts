import { returnsRepairsCreateSchema, returnsRepairsListSchema, returnsRepairsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => returnsRepairsCreateSchema.safeParse(input),
  update: (input: unknown) => returnsRepairsUpdateSchema.safeParse(input),
  list: (input: unknown) => returnsRepairsListSchema.safeParse(input),
};
