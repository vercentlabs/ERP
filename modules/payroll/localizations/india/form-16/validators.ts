import { localizationsIndiaForm16CreateSchema, localizationsIndiaForm16ListSchema, localizationsIndiaForm16UpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaForm16CreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaForm16UpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaForm16ListSchema.safeParse(input),
};
