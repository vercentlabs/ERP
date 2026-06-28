import { qualityCertificatesCreateSchema, qualityCertificatesListSchema, qualityCertificatesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => qualityCertificatesCreateSchema.safeParse(input),
  update: (input: unknown) => qualityCertificatesUpdateSchema.safeParse(input),
  list: (input: unknown) => qualityCertificatesListSchema.safeParse(input),
};
