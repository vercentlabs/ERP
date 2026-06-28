import { engineeringChangeOrdersCreateSchema, engineeringChangeOrdersListSchema, engineeringChangeOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => engineeringChangeOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => engineeringChangeOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => engineeringChangeOrdersListSchema.safeParse(input),
};
