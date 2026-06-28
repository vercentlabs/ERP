import { teamsCreateSchema, teamsListSchema, teamsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => teamsCreateSchema.safeParse(input),
  update: (input: unknown) => teamsUpdateSchema.safeParse(input),
  list: (input: unknown) => teamsListSchema.safeParse(input),
};
