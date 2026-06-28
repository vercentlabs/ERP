import { projectCostingCreateSchema, projectCostingListSchema, projectCostingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectCostingCreateSchema.safeParse(input),
  update: (input: unknown) => projectCostingUpdateSchema.safeParse(input),
  list: (input: unknown) => projectCostingListSchema.safeParse(input),
};
