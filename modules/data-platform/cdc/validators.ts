import { cdcCreateSchema, cdcListSchema, cdcUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => cdcCreateSchema.safeParse(input),
  update: (input: unknown) => cdcUpdateSchema.safeParse(input),
  list: (input: unknown) => cdcListSchema.safeParse(input),
};
