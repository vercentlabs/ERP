import { auditLogsCreateSchema, auditLogsListSchema, auditLogsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => auditLogsCreateSchema.safeParse(input),
  update: (input: unknown) => auditLogsUpdateSchema.safeParse(input),
  list: (input: unknown) => auditLogsListSchema.safeParse(input),
};
