import { developerPortalCreateSchema, developerPortalListSchema, developerPortalUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => developerPortalCreateSchema.safeParse(input),
  update: (input: unknown) => developerPortalUpdateSchema.safeParse(input),
  list: (input: unknown) => developerPortalListSchema.safeParse(input),
};
