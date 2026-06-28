import { promotionsCreateSchema, promotionsListSchema, promotionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => promotionsCreateSchema.safeParse(input),
  update: (input: unknown) => promotionsUpdateSchema.safeParse(input),
  list: (input: unknown) => promotionsListSchema.safeParse(input),
};
