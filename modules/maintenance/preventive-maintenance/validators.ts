import { preventiveMaintenanceCreateSchema, preventiveMaintenanceListSchema, preventiveMaintenanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => preventiveMaintenanceCreateSchema.safeParse(input),
  update: (input: unknown) => preventiveMaintenanceUpdateSchema.safeParse(input),
  list: (input: unknown) => preventiveMaintenanceListSchema.safeParse(input),
};
