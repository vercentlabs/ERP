import { connectorsCreateSchema, connectorsListSchema, connectorsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => connectorsCreateSchema.safeParse(input),
  update: (input: unknown) => connectorsUpdateSchema.safeParse(input),
  list: (input: unknown) => connectorsListSchema.safeParse(input),
};
