export const events = {
  created: "manufacturing/scrap-rework.created",
  updated: "manufacturing/scrap-rework.updated",
  submitted: "manufacturing/scrap-rework.submitted",
  approved: "manufacturing/scrap-rework.approved",
  rejected: "manufacturing/scrap-rework.rejected",
  cancelled: "manufacturing/scrap-rework.cancelled",
  closed: "manufacturing/scrap-rework.closed",
  riskDetected: "manufacturing/scrap-rework.risk-detected",
  nextActionRecommended: "manufacturing/scrap-rework.next-action-recommended",
} as const;
