import { commissionsCreateSchema, commissionsListSchema, commissionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => commissionsCreateSchema.safeParse(input),
  update: (input: unknown) => commissionsUpdateSchema.safeParse(input),
  list: (input: unknown) => commissionsListSchema.safeParse(input),
};
