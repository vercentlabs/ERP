import { activitiesCreateSchema, activitiesListSchema, activitiesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => activitiesCreateSchema.safeParse(input),
  update: (input: unknown) => activitiesUpdateSchema.safeParse(input),
  list: (input: unknown) => activitiesListSchema.safeParse(input),
};
