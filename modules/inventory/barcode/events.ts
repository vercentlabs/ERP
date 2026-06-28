export const events = {
  created: "inventory/barcode.created",
  updated: "inventory/barcode.updated",
  submitted: "inventory/barcode.submitted",
  approved: "inventory/barcode.approved",
  rejected: "inventory/barcode.rejected",
  cancelled: "inventory/barcode.cancelled",
  closed: "inventory/barcode.closed",
  riskDetected: "inventory/barcode.risk-detected",
  nextActionRecommended: "inventory/barcode.next-action-recommended",
} as const;
