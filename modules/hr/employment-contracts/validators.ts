import { employmentContractsCreateSchema, employmentContractsListSchema, employmentContractsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => employmentContractsCreateSchema.safeParse(input),
  update: (input: unknown) => employmentContractsUpdateSchema.safeParse(input),
  list: (input: unknown) => employmentContractsListSchema.safeParse(input),
};
