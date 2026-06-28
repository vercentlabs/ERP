import { localizationsIndiaProfessionalTaxCreateSchema, localizationsIndiaProfessionalTaxListSchema, localizationsIndiaProfessionalTaxUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => localizationsIndiaProfessionalTaxCreateSchema.safeParse(input),
  update: (input: unknown) => localizationsIndiaProfessionalTaxUpdateSchema.safeParse(input),
  list: (input: unknown) => localizationsIndiaProfessionalTaxListSchema.safeParse(input),
};
