import { mrpCreateSchema, mrpListSchema, mrpUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => mrpCreateSchema.safeParse(input),
  update: (input: unknown) => mrpUpdateSchema.safeParse(input),
  list: (input: unknown) => mrpListSchema.safeParse(input),
};
