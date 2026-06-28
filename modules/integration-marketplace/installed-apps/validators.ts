import { installedAppsCreateSchema, installedAppsListSchema, installedAppsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => installedAppsCreateSchema.safeParse(input),
  update: (input: unknown) => installedAppsUpdateSchema.safeParse(input),
  list: (input: unknown) => installedAppsListSchema.safeParse(input),
};
