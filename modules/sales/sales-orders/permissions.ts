export const permissions = {
  view: "sales.orders.view",
  create: "sales.orders.create",
  update: "sales.orders.update",
  delete: "sales.orders.delete",
  changeStatus: "sales.orders.change_status",
  convertFromQuotation: "sales.orders.convert_from_quotation",
  export: "sales.orders.export",
  print: "sales.orders.print",
} as const;

export const permissionList = Object.values(permissions);
