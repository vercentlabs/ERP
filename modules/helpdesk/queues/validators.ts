import { queuesCreateSchema, queuesListSchema, queuesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => queuesCreateSchema.safeParse(input),
  update: (input: unknown) => queuesUpdateSchema.safeParse(input),
  list: (input: unknown) => queuesListSchema.safeParse(input),
};
