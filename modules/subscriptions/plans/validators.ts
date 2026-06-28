import { plansCreateSchema, plansListSchema, plansUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => plansCreateSchema.safeParse(input),
  update: (input: unknown) => plansUpdateSchema.safeParse(input),
  list: (input: unknown) => plansListSchema.safeParse(input),
};
