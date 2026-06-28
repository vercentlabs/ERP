import { deduplicationCreateSchema, deduplicationListSchema, deduplicationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => deduplicationCreateSchema.safeParse(input),
  update: (input: unknown) => deduplicationUpdateSchema.safeParse(input),
  list: (input: unknown) => deduplicationListSchema.safeParse(input),
};
