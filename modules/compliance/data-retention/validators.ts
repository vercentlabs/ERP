import { dataRetentionCreateSchema, dataRetentionListSchema, dataRetentionUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => dataRetentionCreateSchema.safeParse(input),
  update: (input: unknown) => dataRetentionUpdateSchema.safeParse(input),
  list: (input: unknown) => dataRetentionListSchema.safeParse(input),
};
