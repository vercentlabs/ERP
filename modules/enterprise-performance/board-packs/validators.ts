import { boardPacksCreateSchema, boardPacksListSchema, boardPacksUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => boardPacksCreateSchema.safeParse(input),
  update: (input: unknown) => boardPacksUpdateSchema.safeParse(input),
  list: (input: unknown) => boardPacksListSchema.safeParse(input),
};
