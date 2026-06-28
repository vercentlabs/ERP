import { customerPortalCreateSchema, customerPortalListSchema, customerPortalUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customerPortalCreateSchema.safeParse(input),
  update: (input: unknown) => customerPortalUpdateSchema.safeParse(input),
  list: (input: unknown) => customerPortalListSchema.safeParse(input),
};
