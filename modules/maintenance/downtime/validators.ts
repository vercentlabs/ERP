import { downtimeCreateSchema, downtimeListSchema, downtimeUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => downtimeCreateSchema.safeParse(input),
  update: (input: unknown) => downtimeUpdateSchema.safeParse(input),
  list: (input: unknown) => downtimeListSchema.safeParse(input),
};
