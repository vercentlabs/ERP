import { nonConformanceCreateSchema, nonConformanceListSchema, nonConformanceUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => nonConformanceCreateSchema.safeParse(input),
  update: (input: unknown) => nonConformanceUpdateSchema.safeParse(input),
  list: (input: unknown) => nonConformanceListSchema.safeParse(input),
};
