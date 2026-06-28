import { serviceContractsCreateSchema, serviceContractsListSchema, serviceContractsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => serviceContractsCreateSchema.safeParse(input),
  update: (input: unknown) => serviceContractsUpdateSchema.safeParse(input),
  list: (input: unknown) => serviceContractsListSchema.safeParse(input),
};
