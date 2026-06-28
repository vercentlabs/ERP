import { blanketOrdersCreateSchema, blanketOrdersListSchema, blanketOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => blanketOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => blanketOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => blanketOrdersListSchema.safeParse(input),
};
