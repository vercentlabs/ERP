import { healthcareCreateSchema, healthcareListSchema, healthcareUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => healthcareCreateSchema.safeParse(input),
  update: (input: unknown) => healthcareUpdateSchema.safeParse(input),
  list: (input: unknown) => healthcareListSchema.safeParse(input),
};
