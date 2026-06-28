import { eventStreamsCreateSchema, eventStreamsListSchema, eventStreamsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => eventStreamsCreateSchema.safeParse(input),
  update: (input: unknown) => eventStreamsUpdateSchema.safeParse(input),
  list: (input: unknown) => eventStreamsListSchema.safeParse(input),
};
