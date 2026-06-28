import { accountingPostingCreateSchema, accountingPostingListSchema, accountingPostingUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => accountingPostingCreateSchema.safeParse(input),
  update: (input: unknown) => accountingPostingUpdateSchema.safeParse(input),
  list: (input: unknown) => accountingPostingListSchema.safeParse(input),
};
