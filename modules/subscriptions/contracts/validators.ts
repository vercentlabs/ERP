import { contractsCreateSchema, contractsListSchema, contractsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => contractsCreateSchema.safeParse(input),
  update: (input: unknown) => contractsUpdateSchema.safeParse(input),
  list: (input: unknown) => contractsListSchema.safeParse(input),
};
