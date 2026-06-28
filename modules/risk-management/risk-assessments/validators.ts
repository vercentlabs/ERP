import { riskAssessmentsCreateSchema, riskAssessmentsListSchema, riskAssessmentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => riskAssessmentsCreateSchema.safeParse(input),
  update: (input: unknown) => riskAssessmentsUpdateSchema.safeParse(input),
  list: (input: unknown) => riskAssessmentsListSchema.safeParse(input),
};
