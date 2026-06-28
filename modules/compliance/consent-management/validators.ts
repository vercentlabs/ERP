import { consentManagementCreateSchema, consentManagementListSchema, consentManagementUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => consentManagementCreateSchema.safeParse(input),
  update: (input: unknown) => consentManagementUpdateSchema.safeParse(input),
  list: (input: unknown) => consentManagementListSchema.safeParse(input),
};
