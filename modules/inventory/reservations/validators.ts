import { reservationsCreateSchema, reservationsListSchema, reservationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => reservationsCreateSchema.safeParse(input),
  update: (input: unknown) => reservationsUpdateSchema.safeParse(input),
  list: (input: unknown) => reservationsListSchema.safeParse(input),
};
