import { documentsCreateSchema, documentsListSchema, documentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => documentsCreateSchema.safeParse(input),
  update: (input: unknown) => documentsUpdateSchema.safeParse(input),
  list: (input: unknown) => documentsListSchema.safeParse(input),
};
