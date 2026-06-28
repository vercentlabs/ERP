export const events = {
  created: "manufacturing/bill-of-materials.created",
  updated: "manufacturing/bill-of-materials.updated",
  submitted: "manufacturing/bill-of-materials.submitted",
  approved: "manufacturing/bill-of-materials.approved",
  rejected: "manufacturing/bill-of-materials.rejected",
  cancelled: "manufacturing/bill-of-materials.cancelled",
  closed: "manufacturing/bill-of-materials.closed",
  riskDetected: "manufacturing/bill-of-materials.risk-detected",
  nextActionRecommended: "manufacturing/bill-of-materials.next-action-recommended",
} as const;
