import { customDashboardsCreateSchema, customDashboardsListSchema, customDashboardsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customDashboardsCreateSchema.safeParse(input),
  update: (input: unknown) => customDashboardsUpdateSchema.safeParse(input),
  list: (input: unknown) => customDashboardsListSchema.safeParse(input),
};
