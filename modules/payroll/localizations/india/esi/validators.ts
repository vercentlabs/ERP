import { localizationsIndiaEsiCreateSchema, localizationsIndiaEsiListSchema, localizationsIndiaEsiUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaEsiCreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaEsiUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaEsiListSchema.safeParse(input),
};
