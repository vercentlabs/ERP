import { incidentsCreateSchema, incidentsListSchema, incidentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => incidentsCreateSchema.safeParse(input),
  update: (input: unknown) => incidentsUpdateSchema.safeParse(input),
  list: (input: unknown) => incidentsListSchema.safeParse(input),
};
