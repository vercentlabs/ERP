import { landedCostsCreateSchema, landedCostsListSchema, landedCostsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => landedCostsCreateSchema.safeParse(input),
  update: (input: unknown) => landedCostsUpdateSchema.safeParse(input),
  list: (input: unknown) => landedCostsListSchema.safeParse(input),
};
