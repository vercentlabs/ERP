import { qualityInspectionsCreateSchema, qualityInspectionsListSchema, qualityInspectionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => qualityInspectionsCreateSchema.safeParse(input),
  update: (input: unknown) => qualityInspectionsUpdateSchema.safeParse(input),
  list: (input: unknown) => qualityInspectionsListSchema.safeParse(input),
};
