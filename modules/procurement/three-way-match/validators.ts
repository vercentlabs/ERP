import { threeWayMatchCreateSchema, threeWayMatchListSchema, threeWayMatchUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => threeWayMatchCreateSchema.safeParse(input),
  update: (input: unknown) => threeWayMatchUpdateSchema.safeParse(input),
  list: (input: unknown) => threeWayMatchListSchema.safeParse(input),
};
