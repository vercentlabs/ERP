import { importsCreateSchema, importsListSchema, importsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => importsCreateSchema.safeParse(input),
  update: (input: unknown) => importsUpdateSchema.safeParse(input),
  list: (input: unknown) => importsListSchema.safeParse(input),
};
