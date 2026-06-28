import { uomMasterCreateSchema, uomMasterListSchema, uomMasterUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => uomMasterCreateSchema.safeParse(input),
  update: (input: unknown) => uomMasterUpdateSchema.safeParse(input),
  list: (input: unknown) => uomMasterListSchema.safeParse(input),
};
