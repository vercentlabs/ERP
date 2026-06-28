import { routePlanningCreateSchema, routePlanningListSchema, routePlanningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => routePlanningCreateSchema.safeParse(input),
  update: (input: unknown) => routePlanningUpdateSchema.safeParse(input),
  list: (input: unknown) => routePlanningListSchema.safeParse(input),
};
