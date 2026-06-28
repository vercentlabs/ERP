import { automotiveCreateSchema, automotiveListSchema, automotiveUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => automotiveCreateSchema.safeParse(input),
  update: (input: unknown) => automotiveUpdateSchema.safeParse(input),
  list: (input: unknown) => automotiveListSchema.safeParse(input),
};
