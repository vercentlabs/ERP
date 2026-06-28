import { loansAdvancesCreateSchema, loansAdvancesListSchema, loansAdvancesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => loansAdvancesCreateSchema.safeParse(input),
  update: (input: unknown) => loansAdvancesUpdateSchema.safeParse(input),
  list: (input: unknown) => loansAdvancesListSchema.safeParse(input),
};
