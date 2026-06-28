import { renewalsCreateSchema, renewalsListSchema, renewalsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => renewalsCreateSchema.safeParse(input),
  update: (input: unknown) => renewalsUpdateSchema.safeParse(input),
  list: (input: unknown) => renewalsListSchema.safeParse(input),
};
