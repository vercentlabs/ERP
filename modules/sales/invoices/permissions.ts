export const permissions = {
  view: "sales.invoices.view",
  create: "sales.invoices.create",
  update: "sales.invoices.update",
  delete: "sales.invoices.delete",
  issue: "sales.invoices.issue",
  cancel: "sales.invoices.cancel",
  postAccounting: "sales.invoices.post_accounting",
  viewAccounting: "sales.invoices.accounting.view",
  export: "sales.invoices.export",
  print: "sales.invoices.print",
  read: "sales.invoices.view",
  submit: "sales.invoices.issue",
  approve: "sales.invoices.issue",
  reject: "sales.invoices.cancel",
  close: "sales.invoices.issue",
  report: "sales.invoices.export",
} as const;

export type InvoicesPermission = (typeof permissions)[keyof typeof permissions];
