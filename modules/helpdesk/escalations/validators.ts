import { escalationsCreateSchema, escalationsListSchema, escalationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => escalationsCreateSchema.safeParse(input),
  update: (input: unknown) => escalationsUpdateSchema.safeParse(input),
  list: (input: unknown) => escalationsListSchema.safeParse(input),
};
