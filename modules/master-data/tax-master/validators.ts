import { taxMasterCreateSchema, taxMasterListSchema, taxMasterUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => taxMasterCreateSchema.safeParse(input),
  update: (input: unknown) => taxMasterUpdateSchema.safeParse(input),
  list: (input: unknown) => taxMasterListSchema.safeParse(input),
};
