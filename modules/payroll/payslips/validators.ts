import { payslipsCreateSchema, payslipsListSchema, payslipsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => payslipsCreateSchema.safeParse(input),
  update: (input: unknown) => payslipsUpdateSchema.safeParse(input),
  list: (input: unknown) => payslipsListSchema.safeParse(input),
};
