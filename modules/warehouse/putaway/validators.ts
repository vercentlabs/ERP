import { putawayCreateSchema, putawayListSchema, putawayUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => putawayCreateSchema.safeParse(input),
  update: (input: unknown) => putawayUpdateSchema.safeParse(input),
  list: (input: unknown) => putawayListSchema.safeParse(input),
};
