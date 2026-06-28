import { agentOrchestrationCreateSchema, agentOrchestrationListSchema, agentOrchestrationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => agentOrchestrationCreateSchema.safeParse(input),
  update: (input: unknown) => agentOrchestrationUpdateSchema.safeParse(input),
  list: (input: unknown) => agentOrchestrationListSchema.safeParse(input),
};
