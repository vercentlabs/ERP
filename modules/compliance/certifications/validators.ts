import { certificationsCreateSchema, certificationsListSchema, certificationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => certificationsCreateSchema.safeParse(input),
  update: (input: unknown) => certificationsUpdateSchema.safeParse(input),
  list: (input: unknown) => certificationsListSchema.safeParse(input),
};
