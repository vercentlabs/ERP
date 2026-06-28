import { projectBillingCreateSchema, projectBillingListSchema, projectBillingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => projectBillingCreateSchema.safeParse(input),
  update: (input: unknown) => projectBillingUpdateSchema.safeParse(input),
  list: (input: unknown) => projectBillingListSchema.safeParse(input),
};
