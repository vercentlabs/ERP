export const events = {
  accountCreated: "finance.account.created",
  accountUpdated: "finance.account.updated",
  accountDeleted: "finance.account.deleted",
  fiscalYearCreated: "finance.fiscal_year.created",
  fiscalYearClosed: "finance.fiscal_year.closed",
  journalEntryCreated: "finance.journal_entry.created",
  journalEntryUpdated: "finance.journal_entry.updated",
  journalEntryPosted: "finance.journal_entry.posted",
  journalEntryCancelled: "finance.journal_entry.cancelled",
  journalEntryDeleted: "finance.journal_entry.deleted",
  accountingSettingsUpdated: "finance.accounting_settings.updated",
  journalEntryCreatedFromSalesInvoice: "finance.journal_entry.created_from_sales_invoice",
} as const;
