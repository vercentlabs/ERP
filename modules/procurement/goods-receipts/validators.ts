import { goodsReceiptsCreateSchema, goodsReceiptsListSchema, goodsReceiptsUpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => goodsReceiptsCreateSchema.safeParse(input),
  update: (input: unknown) => goodsReceiptsUpdateSchema.safeParse(input),
  list: (input: unknown) => goodsReceiptsListSchema.safeParse(input),
};
