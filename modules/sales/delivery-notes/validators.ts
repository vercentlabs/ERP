import { deliveryNotesCreateSchema, deliveryNotesListSchema, deliveryNotesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => deliveryNotesCreateSchema.safeParse(input),
  update: (input: unknown) => deliveryNotesUpdateSchema.safeParse(input),
  list: (input: unknown) => deliveryNotesListSchema.safeParse(input),
};
