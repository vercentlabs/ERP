import { equipmentCreateSchema, equipmentListSchema, equipmentUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => equipmentCreateSchema.safeParse(input),
  update: (input: unknown) => equipmentUpdateSchema.safeParse(input),
  list: (input: unknown) => equipmentListSchema.safeParse(input),
};
