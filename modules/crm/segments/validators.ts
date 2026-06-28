import { segmentsCreateSchema, segmentsListSchema, segmentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => segmentsCreateSchema.safeParse(input),
  update: (input: unknown) => segmentsUpdateSchema.safeParse(input),
  list: (input: unknown) => segmentsListSchema.safeParse(input),
};
