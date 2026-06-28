import { carriersCreateSchema, carriersListSchema, carriersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => carriersCreateSchema.safeParse(input),
  update: (input: unknown) => carriersUpdateSchema.safeParse(input),
  list: (input: unknown) => carriersListSchema.safeParse(input),
};
