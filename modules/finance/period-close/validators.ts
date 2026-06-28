import { periodCloseCreateSchema, periodCloseListSchema, periodCloseUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => periodCloseCreateSchema.safeParse(input),
  update: (input: unknown) => periodCloseUpdateSchema.safeParse(input),
  list: (input: unknown) => periodCloseListSchema.safeParse(input),
};
