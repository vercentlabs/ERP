import { opportunitiesCreateSchema, opportunitiesListSchema, opportunitiesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => opportunitiesCreateSchema.safeParse(input),
  update: (input: unknown) => opportunitiesUpdateSchema.safeParse(input),
  list: (input: unknown) => opportunitiesListSchema.safeParse(input),
};
