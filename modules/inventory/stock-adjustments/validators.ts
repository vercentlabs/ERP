import { stockAdjustmentsCreateSchema, stockAdjustmentsListSchema, stockAdjustmentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => stockAdjustmentsCreateSchema.safeParse(input),
  update: (input: unknown) => stockAdjustmentsUpdateSchema.safeParse(input),
  list: (input: unknown) => stockAdjustmentsListSchema.safeParse(input),
};
