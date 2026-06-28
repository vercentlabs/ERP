import { servicePartsCreateSchema, servicePartsListSchema, servicePartsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => servicePartsCreateSchema.safeParse(input),
  update: (input: unknown) => servicePartsUpdateSchema.safeParse(input),
  list: (input: unknown) => servicePartsListSchema.safeParse(input),
};
