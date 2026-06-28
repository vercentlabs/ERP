import { educationCreateSchema, educationListSchema, educationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => educationCreateSchema.safeParse(input),
  update: (input: unknown) => educationUpdateSchema.safeParse(input),
  list: (input: unknown) => educationListSchema.safeParse(input),
};
