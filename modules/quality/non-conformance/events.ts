export const events = {
  created: "quality/non-conformance.created",
  updated: "quality/non-conformance.updated",
  submitted: "quality/non-conformance.submitted",
  approved: "quality/non-conformance.approved",
  rejected: "quality/non-conformance.rejected",
  cancelled: "quality/non-conformance.cancelled",
  closed: "quality/non-conformance.closed",
  riskDetected: "quality/non-conformance.risk-detected",
  nextActionRecommended: "quality/non-conformance.next-action-recommended",
} as const;
