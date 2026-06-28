export const events = {
  created: "warehouse/packing.created",
  updated: "warehouse/packing.updated",
  submitted: "warehouse/packing.submitted",
  approved: "warehouse/packing.approved",
  rejected: "warehouse/packing.rejected",
  cancelled: "warehouse/packing.cancelled",
  closed: "warehouse/packing.closed",
  riskDetected: "warehouse/packing.risk-detected",
  nextActionRecommended: "warehouse/packing.next-action-recommended",
} as const;
