import { demandPlanningCreateSchema, demandPlanningListSchema, demandPlanningUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => demandPlanningCreateSchema.safeParse(input),
  update: (input: unknown) => demandPlanningUpdateSchema.safeParse(input),
  list: (input: unknown) => demandPlanningListSchema.safeParse(input),
};
