import { knowledgeBaseCreateSchema, knowledgeBaseListSchema, knowledgeBaseUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => knowledgeBaseCreateSchema.safeParse(input),
  update: (input: unknown) => knowledgeBaseUpdateSchema.safeParse(input),
  list: (input: unknown) => knowledgeBaseListSchema.safeParse(input),
};
