import { biConnectorsCreateSchema, biConnectorsListSchema, biConnectorsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => biConnectorsCreateSchema.safeParse(input),
  update: (input: unknown) => biConnectorsUpdateSchema.safeParse(input),
  list: (input: unknown) => biConnectorsListSchema.safeParse(input),
};
