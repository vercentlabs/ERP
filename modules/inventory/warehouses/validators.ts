import { warehousesCreateSchema, warehousesListSchema, warehousesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => warehousesCreateSchema.safeParse(input),
  update: (input: unknown) => warehousesUpdateSchema.safeParse(input),
  list: (input: unknown) => warehousesListSchema.safeParse(input),
};
