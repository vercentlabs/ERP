import { dashboardsCreateSchema, dashboardsListSchema, dashboardsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dashboardsCreateSchema.safeParse(input),
  update: (input: unknown) => dashboardsUpdateSchema.safeParse(input),
  list: (input: unknown) => dashboardsListSchema.safeParse(input),
};
