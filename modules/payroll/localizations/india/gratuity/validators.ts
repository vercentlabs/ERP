import { localizationsIndiaGratuityCreateSchema, localizationsIndiaGratuityListSchema, localizationsIndiaGratuityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaGratuityCreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaGratuityUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaGratuityListSchema.safeParse(input),
};
