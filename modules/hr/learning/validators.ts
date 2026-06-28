import { learningCreateSchema, learningListSchema, learningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => learningCreateSchema.safeParse(input),
  update: (input: unknown) => learningUpdateSchema.safeParse(input),
  list: (input: unknown) => learningListSchema.safeParse(input),
};
