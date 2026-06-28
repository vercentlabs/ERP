import { customPagesCreateSchema, customPagesListSchema, customPagesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customPagesCreateSchema.safeParse(input),
  update: (input: unknown) => customPagesUpdateSchema.safeParse(input),
  list: (input: unknown) => customPagesListSchema.safeParse(input),
};
