import { routesCreateSchema, routesListSchema, routesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => routesCreateSchema.safeParse(input),
  update: (input: unknown) => routesUpdateSchema.safeParse(input),
  list: (input: unknown) => routesListSchema.safeParse(input),
};
