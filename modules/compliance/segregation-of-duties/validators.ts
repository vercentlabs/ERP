import { segregationOfDutiesCreateSchema, segregationOfDutiesListSchema, segregationOfDutiesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => segregationOfDutiesCreateSchema.safeParse(input),
  update: (input: unknown) => segregationOfDutiesUpdateSchema.safeParse(input),
  list: (input: unknown) => segregationOfDutiesListSchema.safeParse(input),
};
