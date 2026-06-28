import { revenueRecognitionCreateSchema, revenueRecognitionListSchema, revenueRecognitionUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => revenueRecognitionCreateSchema.safeParse(input),
  update: (input: unknown) => revenueRecognitionUpdateSchema.safeParse(input),
  list: (input: unknown) => revenueRecognitionListSchema.safeParse(input),
};
