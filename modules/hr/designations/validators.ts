import { designationsCreateSchema, designationsListSchema, designationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => designationsCreateSchema.safeParse(input),
  update: (input: unknown) => designationsUpdateSchema.safeParse(input),
  list: (input: unknown) => designationsListSchema.safeParse(input),
};
