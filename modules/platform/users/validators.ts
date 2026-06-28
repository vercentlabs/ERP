import { usersCreateSchema, usersListSchema, usersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => usersCreateSchema.safeParse(input),
  update: (input: unknown) => usersUpdateSchema.safeParse(input),
  list: (input: unknown) => usersListSchema.safeParse(input),
};
