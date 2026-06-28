import { professionalServicesCreateSchema, professionalServicesListSchema, professionalServicesUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => professionalServicesCreateSchema.safeParse(input),
  update: (input: unknown) => professionalServicesUpdateSchema.safeParse(input),
  list: (input: unknown) => professionalServicesListSchema.safeParse(input),
};
