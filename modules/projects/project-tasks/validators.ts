import { projectTasksCreateSchema, projectTasksListSchema, projectTasksUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectTasksCreateSchema.safeParse(input),
  update: (input: unknown) => projectTasksUpdateSchema.safeParse(input),
  list: (input: unknown) => projectTasksListSchema.safeParse(input),
};
