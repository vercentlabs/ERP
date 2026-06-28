import { projectTemplatesCreateSchema, projectTemplatesListSchema, projectTemplatesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectTemplatesCreateSchema.safeParse(input),
  update: (input: unknown) => projectTemplatesUpdateSchema.safeParse(input),
  list: (input: unknown) => projectTemplatesListSchema.safeParse(input),
};
