import { varianceAnalysisCreateSchema, varianceAnalysisListSchema, varianceAnalysisUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => varianceAnalysisCreateSchema.safeParse(input),
  update: (input: unknown) => varianceAnalysisUpdateSchema.safeParse(input),
  list: (input: unknown) => varianceAnalysisListSchema.safeParse(input),
};
