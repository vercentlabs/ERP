import { performanceCreateSchema, performanceListSchema, performanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => performanceCreateSchema.safeParse(input),
  update: (input: unknown) => performanceUpdateSchema.safeParse(input),
  list: (input: unknown) => performanceListSchema.safeParse(input),
};
