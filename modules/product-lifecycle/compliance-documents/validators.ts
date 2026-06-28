import { complianceDocumentsCreateSchema, complianceDocumentsListSchema, complianceDocumentsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => complianceDocumentsCreateSchema.safeParse(input),
  update: (input: unknown) => complianceDocumentsUpdateSchema.safeParse(input),
  list: (input: unknown) => complianceDocumentsListSchema.safeParse(input),
};
