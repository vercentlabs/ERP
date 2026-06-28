import { webhooksCreateSchema, webhooksListSchema, webhooksUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => webhooksCreateSchema.safeParse(input),
  update: (input: unknown) => webhooksUpdateSchema.safeParse(input),
  list: (input: unknown) => webhooksListSchema.safeParse(input),
};
