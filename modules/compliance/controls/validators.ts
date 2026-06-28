import { controlsCreateSchema, controlsListSchema, controlsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => controlsCreateSchema.safeParse(input),
  update: (input: unknown) => controlsUpdateSchema.safeParse(input),
  list: (input: unknown) => controlsListSchema.safeParse(input),
};
