import { commentsCreateSchema, commentsListSchema, commentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => commentsCreateSchema.safeParse(input),
  update: (input: unknown) => commentsUpdateSchema.safeParse(input),
  list: (input: unknown) => commentsListSchema.safeParse(input),
};
