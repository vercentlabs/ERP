import { leaveCreateSchema, leaveListSchema, leaveUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => leaveCreateSchema.safeParse(input),
  update: (input: unknown) => leaveUpdateSchema.safeParse(input),
  list: (input: unknown) => leaveListSchema.safeParse(input),
};
