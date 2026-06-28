import { cycleCountsCreateSchema, cycleCountsListSchema, cycleCountsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => cycleCountsCreateSchema.safeParse(input),
  update: (input: unknown) => cycleCountsUpdateSchema.safeParse(input),
  list: (input: unknown) => cycleCountsListSchema.safeParse(input),
};
