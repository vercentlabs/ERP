import { documentIntelligenceCreateSchema, documentIntelligenceListSchema, documentIntelligenceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => documentIntelligenceCreateSchema.safeParse(input),
  update: (input: unknown) => documentIntelligenceUpdateSchema.safeParse(input),
  list: (input: unknown) => documentIntelligenceListSchema.safeParse(input),
};
