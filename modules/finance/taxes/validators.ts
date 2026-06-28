import { taxesCreateSchema, taxesListSchema, taxesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => taxesCreateSchema.safeParse(input),
  update: (input: unknown) => taxesUpdateSchema.safeParse(input),
  list: (input: unknown) => taxesListSchema.safeParse(input),
};
