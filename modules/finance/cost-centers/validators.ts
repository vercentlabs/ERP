import { costCentersCreateSchema, costCentersListSchema, costCentersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => costCentersCreateSchema.safeParse(input),
  update: (input: unknown) => costCentersUpdateSchema.safeParse(input),
  list: (input: unknown) => costCentersListSchema.safeParse(input),
};
