import { settingsCreateSchema, settingsListSchema, settingsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => settingsCreateSchema.safeParse(input),
  update: (input: unknown) => settingsUpdateSchema.safeParse(input),
  list: (input: unknown) => settingsListSchema.safeParse(input),
};
