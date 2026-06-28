import { consolidationCreateSchema, consolidationListSchema, consolidationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => consolidationCreateSchema.safeParse(input),
  update: (input: unknown) => consolidationUpdateSchema.safeParse(input),
  list: (input: unknown) => consolidationListSchema.safeParse(input),
};
