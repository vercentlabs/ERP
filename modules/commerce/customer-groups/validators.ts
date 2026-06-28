import { customerGroupsCreateSchema, customerGroupsListSchema, customerGroupsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customerGroupsCreateSchema.safeParse(input),
  update: (input: unknown) => customerGroupsUpdateSchema.safeParse(input),
  list: (input: unknown) => customerGroupsListSchema.safeParse(input),
};
