import { catalogCreateSchema, catalogListSchema, catalogUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => catalogCreateSchema.safeParse(input),
  update: (input: unknown) => catalogUpdateSchema.safeParse(input),
  list: (input: unknown) => catalogListSchema.safeParse(input),
};
