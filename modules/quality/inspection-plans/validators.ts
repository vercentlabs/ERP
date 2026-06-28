import { inspectionPlansCreateSchema, inspectionPlansListSchema, inspectionPlansUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => inspectionPlansCreateSchema.safeParse(input),
  update: (input: unknown) => inspectionPlansUpdateSchema.safeParse(input),
  list: (input: unknown) => inspectionPlansListSchema.safeParse(input),
};
