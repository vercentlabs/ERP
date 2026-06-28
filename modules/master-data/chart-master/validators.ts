import { chartMasterCreateSchema, chartMasterListSchema, chartMasterUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => chartMasterCreateSchema.safeParse(input),
  update: (input: unknown) => chartMasterUpdateSchema.safeParse(input),
  list: (input: unknown) => chartMasterListSchema.safeParse(input),
};
