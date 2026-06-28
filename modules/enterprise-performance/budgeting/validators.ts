import { budgetingCreateSchema, budgetingListSchema, budgetingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => budgetingCreateSchema.safeParse(input),
  update: (input: unknown) => budgetingUpdateSchema.safeParse(input),
  list: (input: unknown) => budgetingListSchema.safeParse(input),
};
