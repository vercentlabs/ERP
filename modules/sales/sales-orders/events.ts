export const events = {
  created: "sales.order.created",
  createdFromQuotation: "sales.order.created_from_quotation",
  updated: "sales.order.updated",
  deleted: "sales.order.deleted",
  statusChanged: "sales.order.status_changed",
  confirmed: "sales.order.confirmed",
  cancelled: "sales.order.cancelled",
  closed: "sales.order.closed",
} as const;
