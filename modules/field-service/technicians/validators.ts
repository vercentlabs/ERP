import { techniciansCreateSchema, techniciansListSchema, techniciansUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => techniciansCreateSchema.safeParse(input),
  update: (input: unknown) => techniciansUpdateSchema.safeParse(input),
  list: (input: unknown) => techniciansListSchema.safeParse(input),
};
