import { erpAssistantCreateSchema, erpAssistantListSchema, erpAssistantUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => erpAssistantCreateSchema.safeParse(input),
  update: (input: unknown) => erpAssistantUpdateSchema.safeParse(input),
  list: (input: unknown) => erpAssistantListSchema.safeParse(input),
};
