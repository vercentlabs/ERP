import { internalControlsCreateSchema, internalControlsListSchema, internalControlsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => internalControlsCreateSchema.safeParse(input),
  update: (input: unknown) => internalControlsUpdateSchema.safeParse(input),
  list: (input: unknown) => internalControlsListSchema.safeParse(input),
};
