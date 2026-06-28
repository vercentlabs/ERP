import { sustainabilityReportsCreateSchema, sustainabilityReportsListSchema, sustainabilityReportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => sustainabilityReportsCreateSchema.safeParse(input),
  update: (input: unknown) => sustainabilityReportsUpdateSchema.safeParse(input),
  list: (input: unknown) => sustainabilityReportsListSchema.safeParse(input),
};
