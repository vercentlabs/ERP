import { unitsOfMeasureCreateSchema, unitsOfMeasureListSchema, unitsOfMeasureUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => unitsOfMeasureCreateSchema.safeParse(input),
  update: (input: unknown) => unitsOfMeasureUpdateSchema.safeParse(input),
  list: (input: unknown) => unitsOfMeasureListSchema.safeParse(input),
};
