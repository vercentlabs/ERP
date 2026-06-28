import { apiKeysCreateSchema, apiKeysListSchema, apiKeysUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => apiKeysCreateSchema.safeParse(input),
  update: (input: unknown) => apiKeysUpdateSchema.safeParse(input),
  list: (input: unknown) => apiKeysListSchema.safeParse(input),
};
