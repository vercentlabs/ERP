import { addressBookCreateSchema, addressBookListSchema, addressBookUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => addressBookCreateSchema.safeParse(input),
  update: (input: unknown) => addressBookUpdateSchema.safeParse(input),
  list: (input: unknown) => addressBookListSchema.safeParse(input),
};
