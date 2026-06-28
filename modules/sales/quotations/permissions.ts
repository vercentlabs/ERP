export const permissions = {
  view: "sales.quotations.view",
  create: "sales.quotations.create",
  update: "sales.quotations.update",
  delete: "sales.quotations.delete",
  changeStatus: "sales.quotations.change_status",
  export: "sales.quotations.export",
  print: "sales.quotations.print",
} as const;

export const permissionList = Object.values(permissions);
