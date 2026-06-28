import { scriptingCreateSchema, scriptingListSchema, scriptingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => scriptingCreateSchema.safeParse(input),
  update: (input: unknown) => scriptingUpdateSchema.safeParse(input),
  list: (input: unknown) => scriptingListSchema.safeParse(input),
};
