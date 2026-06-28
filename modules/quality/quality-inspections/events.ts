export const events = {
  created: "quality/quality-inspections.created",
  updated: "quality/quality-inspections.updated",
  submitted: "quality/quality-inspections.submitted",
  approved: "quality/quality-inspections.approved",
  rejected: "quality/quality-inspections.rejected",
  cancelled: "quality/quality-inspections.cancelled",
  closed: "quality/quality-inspections.closed",
  riskDetected: "quality/quality-inspections.risk-detected",
  nextActionRecommended: "quality/quality-inspections.next-action-recommended",
} as const;
