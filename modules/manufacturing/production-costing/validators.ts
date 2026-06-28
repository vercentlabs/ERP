import { productionCostingCreateSchema, productionCostingListSchema, productionCostingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => productionCostingCreateSchema.safeParse(input),
  update: (input: unknown) => productionCostingUpdateSchema.safeParse(input),
  list: (input: unknown) => productionCostingListSchema.safeParse(input),
};
