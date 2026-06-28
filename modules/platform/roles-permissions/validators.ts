import { rolesPermissionsCreateSchema, rolesPermissionsListSchema, rolesPermissionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => rolesPermissionsCreateSchema.safeParse(input),
  update: (input: unknown) => rolesPermissionsUpdateSchema.safeParse(input),
  list: (input: unknown) => rolesPermissionsListSchema.safeParse(input),
};
