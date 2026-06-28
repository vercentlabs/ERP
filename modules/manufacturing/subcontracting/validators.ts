import { subcontractingCreateSchema, subcontractingListSchema, subcontractingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => subcontractingCreateSchema.safeParse(input),
  update: (input: unknown) => subcontractingUpdateSchema.safeParse(input),
  list: (input: unknown) => subcontractingListSchema.safeParse(input),
};
