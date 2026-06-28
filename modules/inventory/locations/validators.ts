import { locationsCreateSchema, locationsListSchema, locationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => locationsCreateSchema.safeParse(input),
  update: (input: unknown) => locationsUpdateSchema.safeParse(input),
  list: (input: unknown) => locationsListSchema.safeParse(input),
};
