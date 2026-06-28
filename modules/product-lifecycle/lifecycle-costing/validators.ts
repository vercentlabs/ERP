import { lifecycleCostingCreateSchema, lifecycleCostingListSchema, lifecycleCostingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => lifecycleCostingCreateSchema.safeParse(input),
  update: (input: unknown) => lifecycleCostingUpdateSchema.safeParse(input),
  list: (input: unknown) => lifecycleCostingListSchema.safeParse(input),
};
