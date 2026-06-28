import { barcodeCreateSchema, barcodeListSchema, barcodeUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => barcodeCreateSchema.safeParse(input),
  update: (input: unknown) => barcodeUpdateSchema.safeParse(input),
  list: (input: unknown) => barcodeListSchema.safeParse(input),
};
