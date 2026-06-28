import { benefitsCreateSchema, benefitsListSchema, benefitsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => benefitsCreateSchema.safeParse(input),
  update: (input: unknown) => benefitsUpdateSchema.safeParse(input),
  list: (input: unknown) => benefitsListSchema.safeParse(input),
};
