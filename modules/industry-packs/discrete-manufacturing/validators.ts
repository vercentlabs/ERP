import { discreteManufacturingCreateSchema, discreteManufacturingListSchema, discreteManufacturingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => discreteManufacturingCreateSchema.safeParse(input),
  update: (input: unknown) => discreteManufacturingUpdateSchema.safeParse(input),
  list: (input: unknown) => discreteManufacturingListSchema.safeParse(input),
};
