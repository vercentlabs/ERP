import { approvalsAuditCreateSchema, approvalsAuditListSchema, approvalsAuditUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => approvalsAuditCreateSchema.safeParse(input),
  update: (input: unknown) => approvalsAuditUpdateSchema.safeParse(input),
  list: (input: unknown) => approvalsAuditListSchema.safeParse(input),
};
