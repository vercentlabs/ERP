import { publicApiCreateSchema, publicApiListSchema, publicApiUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => publicApiCreateSchema.safeParse(input),
  update: (input: unknown) => publicApiUpdateSchema.safeParse(input),
  list: (input: unknown) => publicApiListSchema.safeParse(input),
};
