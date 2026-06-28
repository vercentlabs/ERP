import { projectsCreateSchema, projectsListSchema, projectsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectsCreateSchema.safeParse(input),
  update: (input: unknown) => projectsUpdateSchema.safeParse(input),
  list: (input: unknown) => projectsListSchema.safeParse(input),
};
