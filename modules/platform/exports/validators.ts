import { exportsCreateSchema, exportsListSchema, exportsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => exportsCreateSchema.safeParse(input),
  update: (input: unknown) => exportsUpdateSchema.safeParse(input),
  list: (input: unknown) => exportsListSchema.safeParse(input),
};
