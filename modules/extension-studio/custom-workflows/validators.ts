import { customWorkflowsCreateSchema, customWorkflowsListSchema, customWorkflowsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customWorkflowsCreateSchema.safeParse(input),
  update: (input: unknown) => customWorkflowsUpdateSchema.safeParse(input),
  list: (input: unknown) => customWorkflowsListSchema.safeParse(input),
};
