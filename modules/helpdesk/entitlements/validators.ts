import { entitlementsCreateSchema, entitlementsListSchema, entitlementsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => entitlementsCreateSchema.safeParse(input),
  update: (input: unknown) => entitlementsUpdateSchema.safeParse(input),
  list: (input: unknown) => entitlementsListSchema.safeParse(input),
};
