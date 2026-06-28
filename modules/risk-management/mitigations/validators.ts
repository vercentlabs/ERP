import { mitigationsCreateSchema, mitigationsListSchema, mitigationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => mitigationsCreateSchema.safeParse(input),
  update: (input: unknown) => mitigationsUpdateSchema.safeParse(input),
  list: (input: unknown) => mitigationsListSchema.safeParse(input),
};
