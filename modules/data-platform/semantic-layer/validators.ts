import { semanticLayerCreateSchema, semanticLayerListSchema, semanticLayerUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => semanticLayerCreateSchema.safeParse(input),
  update: (input: unknown) => semanticLayerUpdateSchema.safeParse(input),
  list: (input: unknown) => semanticLayerListSchema.safeParse(input),
};
