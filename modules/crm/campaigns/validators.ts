import { campaignsCreateSchema, campaignsListSchema, campaignsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => campaignsCreateSchema.safeParse(input),
  update: (input: unknown) => campaignsUpdateSchema.safeParse(input),
  list: (input: unknown) => campaignsListSchema.safeParse(input),
};
