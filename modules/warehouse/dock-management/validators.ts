import { dockManagementCreateSchema, dockManagementListSchema, dockManagementUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dockManagementCreateSchema.safeParse(input),
  update: (input: unknown) => dockManagementUpdateSchema.safeParse(input),
  list: (input: unknown) => dockManagementListSchema.safeParse(input),
};
