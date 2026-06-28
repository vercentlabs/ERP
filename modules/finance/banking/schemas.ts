import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const requiredDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const page = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);
const scope = { tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional() };
const bankAccountType = z.enum(["CASH", "CURRENT", "SAVINGS", "OD", "OTHER"]);
const bankAccountStatus = z.enum(["ACTIVE", "INACTIVE"]);
const reconciliationStatus = z.enum(["DRAFT", "COMPLETED", "CANCELLED"]);

export const bankAccountCreateSchema = z.object({
  ...scope,
  accountId: z.string().uuid(),
  bankName: z.string().optional(),
  accountName: z.string().min(1),
  accountNumberLast4: z.string().max(4).optional(),
  ifscCode: z.string().optional(),
  branchName: z.string().optional(),
  accountType: bankAccountType,
  currency: z.string().default("INR"),
  openingBalance: z.coerce.number().default(0),
  status: bankAccountStatus.default("ACTIVE"),
  isDefault: z.boolean().optional(),
  notes: z.string().optional(),
});
export const bankAccountUpdateSchema = bankAccountCreateSchema.omit({ tenantId: true, accountId: true }).partial();
export const bankAccountListSchema = z.object({
  ...scope,
  page,
  pageSize,
  search: z.string().optional(),
  status: bankAccountStatus.optional(),
  accountType: bankAccountType.optional(),
  sortBy: z.enum(["created_at", "updated_at", "account_name"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const cashBankLedgerQuerySchema = z.object({
  ...scope,
  page,
  pageSize,
  bankAccountId: z.string().uuid().optional(),
  accountId: z.string().uuid().optional(),
  dateFrom: optionalDate,
  dateTo: optionalDate,
  referenceType: z.string().optional(),
  reconciled: z.coerce.boolean().optional(),
});

export const reconciliationLineInputSchema = z.object({
  transactionDate: requiredDate,
  description: z.string().min(1),
  referenceNumber: z.string().optional(),
  debitAmount: z.coerce.number().nonnegative().default(0),
  creditAmount: z.coerce.number().nonnegative().default(0),
}).refine((line) => (line.debitAmount > 0 && line.creditAmount === 0) || (line.creditAmount > 0 && line.debitAmount === 0), "Statement line must have either debit or credit amount");

const bankReconciliationCreateBaseSchema = z.object({
  ...scope,
  reconciliationNumber: z.string().optional(),
  bankAccountId: z.string().uuid(),
  statementStartDate: requiredDate,
  statementEndDate: requiredDate,
  openingStatementBalance: z.coerce.number().default(0),
  closingStatementBalance: z.coerce.number(),
  notes: z.string().optional(),
  lines: z.array(reconciliationLineInputSchema).default([]),
});
export const bankReconciliationCreateSchema = bankReconciliationCreateBaseSchema.refine((value) => value.statementStartDate <= value.statementEndDate, "Statement start date must be before end date");
export const bankReconciliationUpdateSchema = bankReconciliationCreateBaseSchema.omit({ tenantId: true, bankAccountId: true, reconciliationNumber: true }).partial().extend({ lines: z.array(reconciliationLineInputSchema).optional() }).refine((value) => !value.statementStartDate || !value.statementEndDate || value.statementStartDate <= value.statementEndDate, "Statement start date must be before end date");
export const bankReconciliationListSchema = z.object({
  ...scope,
  page,
  pageSize,
  search: z.string().optional(),
  bankAccountId: z.string().uuid().optional(),
  status: reconciliationStatus.optional(),
  dateFrom: optionalDate,
  dateTo: optionalDate,
  sortBy: z.enum(["created_at", "updated_at", "statement_end_date"]).default("created_at"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});
export const matchStatementLineSchema = z.object({ journalEntryLineId: z.string().uuid() });
export const completeReconciliationSchema = z.object({ allowDifference: z.literal(false).optional() }).default({});
export const cancelReconciliationSchema = z.object({ reason: z.string().optional() }).default({});
