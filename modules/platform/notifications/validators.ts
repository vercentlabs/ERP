import { notificationsCreateSchema, notificationsListSchema, notificationsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => notificationsCreateSchema.safeParse(input),
  update: (input: unknown) => notificationsUpdateSchema.safeParse(input),
  list: (input: unknown) => notificationsListSchema.safeParse(input),
};
