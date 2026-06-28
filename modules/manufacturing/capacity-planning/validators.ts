import { capacityPlanningCreateSchema, capacityPlanningListSchema, capacityPlanningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => capacityPlanningCreateSchema.safeParse(input),
  update: (input: unknown) => capacityPlanningUpdateSchema.safeParse(input),
  list: (input: unknown) => capacityPlanningListSchema.safeParse(input),
};
