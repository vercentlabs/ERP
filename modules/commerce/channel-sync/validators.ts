import { channelSyncCreateSchema, channelSyncListSchema, channelSyncUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => channelSyncCreateSchema.safeParse(input),
  update: (input: unknown) => channelSyncUpdateSchema.safeParse(input),
  list: (input: unknown) => channelSyncListSchema.safeParse(input),
};
