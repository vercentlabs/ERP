import { bankReconciliationCreateSchema, bankReconciliationListSchema, bankReconciliationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => bankReconciliationCreateSchema.safeParse(input),
  update: (input: unknown) => bankReconciliationUpdateSchema.safeParse(input),
  list: (input: unknown) => bankReconciliationListSchema.safeParse(input),
};
