export const permissions = {
  view: "sales.delivery_notes.view",
  create: "sales.delivery_notes.create",
  update: "sales.delivery_notes.update",
  delete: "sales.delivery_notes.delete",
  post: "sales.delivery_notes.post",
  cancel: "sales.delivery_notes.cancel",
  export: "sales.delivery_notes.export",
  print: "sales.delivery_notes.print",
  read: "sales.delivery_notes.view",
  submit: "sales.delivery_notes.post",
  approve: "sales.delivery_notes.post",
  reject: "sales.delivery_notes.cancel",
  close: "sales.delivery_notes.post",
  report: "sales.delivery_notes.export",
} as const;

export type DeliveryNotesPermission = (typeof permissions)[keyof typeof permissions];
