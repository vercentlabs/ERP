import { z } from "zod";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const page = z.coerce.number().int().positive().default(1);
const pageSize = z.coerce.number().int().positive().max(200).default(25);
const accountType = z.enum(["ASSET", "LIABILITY", "EQUITY", "INCOME", "EXPENSE"]);
const balanceType = z.enum(["DEBIT", "CREDIT"]);

export const accountGroupCreateSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), name: z.string().min(1), code: z.string().min(1), type: accountType, parentGroupId: z.string().uuid().optional(), isSystem: z.boolean().optional(), isActive: z.boolean().optional() });
export const accountCreateSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), accountCode: z.string().min(1), accountName: z.string().min(1), accountType, groupId: z.string().uuid().optional(), parentAccountId: z.string().uuid().optional(), normalBalance: balanceType.optional(), isControlAccount: z.boolean().optional(), isCashAccount: z.boolean().optional(), isBankAccount: z.boolean().optional(), isSystem: z.boolean().optional(), isActive: z.boolean().optional(), openingBalance: z.coerce.number().default(0), openingBalanceType: balanceType.optional() });
export const accountUpdateSchema = accountCreateSchema.omit({ tenantId: true, accountCode: true }).partial();
export const accountListSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), page, pageSize, search: z.string().optional(), type: accountType.optional(), isActive: z.coerce.boolean().optional(), sortBy: z.enum(["account_code", "account_name", "created_at", "updated_at"]).default("account_code"), sortDirection: z.enum(["asc", "desc"]).default("asc") });

export const fiscalYearCreateSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), name: z.string().min(1), startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), isDefault: z.boolean().optional() }).refine((value) => value.startDate <= value.endDate, "Fiscal year start date must be before end date");
export const fiscalYearListSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), page, pageSize, search: z.string().optional(), status: z.enum(["OPEN", "CLOSED"]).optional() });

export const journalEntryLineSchema = z.object({ accountId: z.string().uuid(), partyId: z.string().uuid().optional(), customerId: z.string().uuid().optional(), supplierId: z.string().uuid().optional(), debitAmount: z.coerce.number().nonnegative().default(0), creditAmount: z.coerce.number().nonnegative().default(0), narration: z.string().optional() }).refine((line) => (line.debitAmount > 0 && line.creditAmount === 0) || (line.creditAmount > 0 && line.debitAmount === 0), "Each journal line must have either debit or credit amount");
export const journalEntryCreateSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), journalNumber: z.string().optional(), journalDate: optionalDate, postingDate: optionalDate, fiscalYearId: z.string().uuid(), referenceType: z.string().optional(), referenceId: z.string().uuid().optional(), sourceModule: z.string().optional(), narration: z.string().optional(), lines: z.array(journalEntryLineSchema).min(2) });
export const journalEntryUpdateSchema = journalEntryCreateSchema.omit({ tenantId: true, journalNumber: true }).partial().extend({ lines: z.array(journalEntryLineSchema).min(2).optional() });
export const journalEntryListSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), page, pageSize, search: z.string().optional(), status: z.enum(["DRAFT", "POSTED", "CANCELLED"]).optional(), fiscalYearId: z.string().uuid().optional(), dateFrom: optionalDate, dateTo: optionalDate, sortBy: z.enum(["journal_date", "posting_date", "created_at", "updated_at"]).default("created_at"), sortDirection: z.enum(["asc", "desc"]).default("desc") });
export const trialBalanceSchema = z.object({ tenantId: z.string().min(1), companyId: z.string().optional(), branchId: z.string().optional(), fiscalYearId: z.string().uuid().optional(), dateFrom: optionalDate, dateTo: optionalDate });
export const accountingSettingsUpdateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  accountsReceivableAccountId: z.string().uuid(),
  salesIncomeAccountId: z.string().uuid(),
  salesReturnsAccountId: z.string().uuid().optional(),
  additionalChargesIncomeAccountId: z.string().uuid().optional(),
  salesTaxPayableAccountId: z.string().uuid().optional(),
  roundingAdjustmentAccountId: z.string().uuid().optional(),
});
