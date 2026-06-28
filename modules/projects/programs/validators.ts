import { programsCreateSchema, programsListSchema, programsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => programsCreateSchema.safeParse(input),
  update: (input: unknown) => programsUpdateSchema.safeParse(input),
  list: (input: unknown) => programsListSchema.safeParse(input),
};
