import { resourcePlanningCreateSchema, resourcePlanningListSchema, resourcePlanningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => resourcePlanningCreateSchema.safeParse(input),
  update: (input: unknown) => resourcePlanningUpdateSchema.safeParse(input),
  list: (input: unknown) => resourcePlanningListSchema.safeParse(input),
};
