import { customObjectsCreateSchema, customObjectsListSchema, customObjectsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customObjectsCreateSchema.safeParse(input),
  update: (input: unknown) => customObjectsUpdateSchema.safeParse(input),
  list: (input: unknown) => customObjectsListSchema.safeParse(input),
};
