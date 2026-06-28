import { recruitmentCreateSchema, recruitmentListSchema, recruitmentUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => recruitmentCreateSchema.safeParse(input),
  update: (input: unknown) => recruitmentUpdateSchema.safeParse(input),
  list: (input: unknown) => recruitmentListSchema.safeParse(input),
};
