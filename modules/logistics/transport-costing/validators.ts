import { transportCostingCreateSchema, transportCostingListSchema, transportCostingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => transportCostingCreateSchema.safeParse(input),
  update: (input: unknown) => transportCostingUpdateSchema.safeParse(input),
  list: (input: unknown) => transportCostingListSchema.safeParse(input),
};
