import { mpsCreateSchema, mpsListSchema, mpsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => mpsCreateSchema.safeParse(input),
  update: (input: unknown) => mpsUpdateSchema.safeParse(input),
  list: (input: unknown) => mpsListSchema.safeParse(input),
};
