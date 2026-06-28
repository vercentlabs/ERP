import { dunningCreateSchema, dunningListSchema, dunningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dunningCreateSchema.safeParse(input),
  update: (input: unknown) => dunningUpdateSchema.safeParse(input),
  list: (input: unknown) => dunningListSchema.safeParse(input),
};
