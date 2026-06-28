import { purchaseRequisitionsCreateSchema, purchaseRequisitionsListSchema, purchaseRequisitionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => purchaseRequisitionsCreateSchema.safeParse(input),
  update: (input: unknown) => purchaseRequisitionsUpdateSchema.safeParse(input),
  list: (input: unknown) => purchaseRequisitionsListSchema.safeParse(input),
};
