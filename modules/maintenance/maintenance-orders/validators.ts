import { maintenanceOrdersCreateSchema, maintenanceOrdersListSchema, maintenanceOrdersUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => maintenanceOrdersCreateSchema.safeParse(input),
  update: (input: unknown) => maintenanceOrdersUpdateSchema.safeParse(input),
  list: (input: unknown) => maintenanceOrdersListSchema.safeParse(input),
};
