import { planningCreateSchema, planningListSchema, planningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => planningCreateSchema.safeParse(input),
  update: (input: unknown) => planningUpdateSchema.safeParse(input),
  list: (input: unknown) => planningListSchema.safeParse(input),
};
