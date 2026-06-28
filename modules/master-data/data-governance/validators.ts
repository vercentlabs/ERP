import { dataGovernanceCreateSchema, dataGovernanceListSchema, dataGovernanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataGovernanceCreateSchema.safeParse(input),
  update: (input: unknown) => dataGovernanceUpdateSchema.safeParse(input),
  list: (input: unknown) => dataGovernanceListSchema.safeParse(input),
};
