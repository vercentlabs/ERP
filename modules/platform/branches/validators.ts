import { branchesCreateSchema, branchesListSchema, branchesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => branchesCreateSchema.safeParse(input),
  update: (input: unknown) => branchesUpdateSchema.safeParse(input),
  list: (input: unknown) => branchesListSchema.safeParse(input),
};
