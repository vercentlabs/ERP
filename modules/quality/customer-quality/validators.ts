import { customerQualityCreateSchema, customerQualityListSchema, customerQualityUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => customerQualityCreateSchema.safeParse(input),
  update: (input: unknown) => customerQualityUpdateSchema.safeParse(input),
  list: (input: unknown) => customerQualityListSchema.safeParse(input),
};
