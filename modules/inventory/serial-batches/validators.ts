import { serialBatchesCreateSchema, serialBatchesListSchema, serialBatchesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => serialBatchesCreateSchema.safeParse(input),
  update: (input: unknown) => serialBatchesUpdateSchema.safeParse(input),
  list: (input: unknown) => serialBatchesListSchema.safeParse(input),
};
