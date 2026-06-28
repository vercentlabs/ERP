import { replenishmentTasksCreateSchema, replenishmentTasksListSchema, replenishmentTasksUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => replenishmentTasksCreateSchema.safeParse(input),
  update: (input: unknown) => replenishmentTasksUpdateSchema.safeParse(input),
  list: (input: unknown) => replenishmentTasksListSchema.safeParse(input),
};
