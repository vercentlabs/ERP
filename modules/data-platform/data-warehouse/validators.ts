import { dataWarehouseCreateSchema, dataWarehouseListSchema, dataWarehouseUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataWarehouseCreateSchema.safeParse(input),
  update: (input: unknown) => dataWarehouseUpdateSchema.safeParse(input),
  list: (input: unknown) => dataWarehouseListSchema.safeParse(input),
};
