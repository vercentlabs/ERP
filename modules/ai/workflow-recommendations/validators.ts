import { workflowRecommendationsCreateSchema, workflowRecommendationsListSchema, workflowRecommendationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => workflowRecommendationsCreateSchema.safeParse(input),
  update: (input: unknown) => workflowRecommendationsUpdateSchema.safeParse(input),
  list: (input: unknown) => workflowRecommendationsListSchema.safeParse(input),
};
