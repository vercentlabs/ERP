import { creditNotesCreateSchema, creditNotesListSchema, creditNotesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => creditNotesCreateSchema.safeParse(input),
  update: (input: unknown) => creditNotesUpdateSchema.safeParse(input),
  list: (input: unknown) => creditNotesListSchema.safeParse(input),
};
