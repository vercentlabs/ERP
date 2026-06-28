import { leadScoringCreateSchema, leadScoringListSchema, leadScoringUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => leadScoringCreateSchema.safeParse(input),
  update: (input: unknown) => leadScoringUpdateSchema.safeParse(input),
  list: (input: unknown) => leadScoringListSchema.safeParse(input),
};
