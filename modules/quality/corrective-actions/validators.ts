import { correctiveActionsCreateSchema, correctiveActionsListSchema, correctiveActionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => correctiveActionsCreateSchema.safeParse(input),
  update: (input: unknown) => correctiveActionsUpdateSchema.safeParse(input),
  list: (input: unknown) => correctiveActionsListSchema.safeParse(input),
};
