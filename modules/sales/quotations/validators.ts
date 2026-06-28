import { quotationsCreateSchema, quotationsListSchema, quotationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => quotationsCreateSchema.safeParse(input),
  update: (input: unknown) => quotationsUpdateSchema.safeParse(input),
  list: (input: unknown) => quotationsListSchema.safeParse(input),
};
