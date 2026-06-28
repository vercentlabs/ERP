import { emissionsCreateSchema, emissionsListSchema, emissionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => emissionsCreateSchema.safeParse(input),
  update: (input: unknown) => emissionsUpdateSchema.safeParse(input),
  list: (input: unknown) => emissionsListSchema.safeParse(input),
};
