import { cashFlowCreateSchema, cashFlowListSchema, cashFlowUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => cashFlowCreateSchema.safeParse(input),
  update: (input: unknown) => cashFlowUpdateSchema.safeParse(input),
  list: (input: unknown) => cashFlowListSchema.safeParse(input),
};
