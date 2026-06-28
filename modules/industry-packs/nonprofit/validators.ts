import { nonprofitCreateSchema, nonprofitListSchema, nonprofitUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => nonprofitCreateSchema.safeParse(input),
  update: (input: unknown) => nonprofitUpdateSchema.safeParse(input),
  list: (input: unknown) => nonprofitListSchema.safeParse(input),
};
