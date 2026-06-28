import { replenishmentCreateSchema, replenishmentListSchema, replenishmentUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => replenishmentCreateSchema.safeParse(input),
  update: (input: unknown) => replenishmentUpdateSchema.safeParse(input),
  list: (input: unknown) => replenishmentListSchema.safeParse(input),
};
