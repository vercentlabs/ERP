import { shopFloorCreateSchema, shopFloorListSchema, shopFloorUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => shopFloorCreateSchema.safeParse(input),
  update: (input: unknown) => shopFloorUpdateSchema.safeParse(input),
  list: (input: unknown) => shopFloorListSchema.safeParse(input),
};
