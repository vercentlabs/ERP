import { processManufacturingCreateSchema, processManufacturingListSchema, processManufacturingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => processManufacturingCreateSchema.safeParse(input),
  update: (input: unknown) => processManufacturingUpdateSchema.safeParse(input),
  list: (input: unknown) => processManufacturingListSchema.safeParse(input),
};
