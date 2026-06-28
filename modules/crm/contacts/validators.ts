import { contactsCreateSchema, contactsListSchema, contactsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => contactsCreateSchema.safeParse(input),
  update: (input: unknown) => contactsUpdateSchema.safeParse(input),
  list: (input: unknown) => contactsListSchema.safeParse(input),
};
