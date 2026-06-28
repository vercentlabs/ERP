import { workflowApprovalsCreateSchema, workflowApprovalsListSchema, workflowApprovalsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => workflowApprovalsCreateSchema.safeParse(input),
  update: (input: unknown) => workflowApprovalsUpdateSchema.safeParse(input),
  list: (input: unknown) => workflowApprovalsListSchema.safeParse(input),
};
