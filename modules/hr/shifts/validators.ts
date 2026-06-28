import { shiftsCreateSchema, shiftsListSchema, shiftsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => shiftsCreateSchema.safeParse(input),
  update: (input: unknown) => shiftsUpdateSchema.safeParse(input),
  list: (input: unknown) => shiftsListSchema.safeParse(input),
};
