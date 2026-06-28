import { profitCentersCreateSchema, profitCentersListSchema, profitCentersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => profitCentersCreateSchema.safeParse(input),
  update: (input: unknown) => profitCentersUpdateSchema.safeParse(input),
  list: (input: unknown) => profitCentersListSchema.safeParse(input),
};
