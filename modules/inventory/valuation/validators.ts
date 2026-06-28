import { valuationCreateSchema, valuationListSchema, valuationUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => valuationCreateSchema.safeParse(input),
  update: (input: unknown) => valuationUpdateSchema.safeParse(input),
  list: (input: unknown) => valuationListSchema.safeParse(input),
};
