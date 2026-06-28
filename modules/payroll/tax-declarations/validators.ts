import { taxDeclarationsCreateSchema, taxDeclarationsListSchema, taxDeclarationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => taxDeclarationsCreateSchema.safeParse(input),
  update: (input: unknown) => taxDeclarationsUpdateSchema.safeParse(input),
  list: (input: unknown) => taxDeclarationsListSchema.safeParse(input),
};
