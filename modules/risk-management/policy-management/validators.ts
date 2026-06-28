import { policyManagementCreateSchema, policyManagementListSchema, policyManagementUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => policyManagementCreateSchema.safeParse(input),
  update: (input: unknown) => policyManagementUpdateSchema.safeParse(input),
  list: (input: unknown) => policyManagementListSchema.safeParse(input),
};
