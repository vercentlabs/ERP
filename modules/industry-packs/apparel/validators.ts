import { apparelCreateSchema, apparelListSchema, apparelUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => apparelCreateSchema.safeParse(input),
  update: (input: unknown) => apparelUpdateSchema.safeParse(input),
  list: (input: unknown) => apparelListSchema.safeParse(input),
};
