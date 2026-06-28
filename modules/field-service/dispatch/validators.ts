import { dispatchCreateSchema, dispatchListSchema, dispatchUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dispatchCreateSchema.safeParse(input),
  update: (input: unknown) => dispatchUpdateSchema.safeParse(input),
  list: (input: unknown) => dispatchListSchema.safeParse(input),
};
