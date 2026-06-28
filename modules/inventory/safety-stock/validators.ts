import { safetyStockCreateSchema, safetyStockListSchema, safetyStockUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => safetyStockCreateSchema.safeParse(input),
  update: (input: unknown) => safetyStockUpdateSchema.safeParse(input),
  list: (input: unknown) => safetyStockListSchema.safeParse(input),
};
