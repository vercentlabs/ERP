import { oauthConnectionsCreateSchema, oauthConnectionsListSchema, oauthConnectionsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => oauthConnectionsCreateSchema.safeParse(input),
  update: (input: unknown) => oauthConnectionsUpdateSchema.safeParse(input),
  list: (input: unknown) => oauthConnectionsListSchema.safeParse(input),
};
