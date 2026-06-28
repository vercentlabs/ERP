import { sdkManagementCreateSchema, sdkManagementListSchema, sdkManagementUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => sdkManagementCreateSchema.safeParse(input),
  update: (input: unknown) => sdkManagementUpdateSchema.safeParse(input),
  list: (input: unknown) => sdkManagementListSchema.safeParse(input),
};
