export const events = {
  created: "logistics/proof-of-delivery.created",
  updated: "logistics/proof-of-delivery.updated",
  submitted: "logistics/proof-of-delivery.submitted",
  approved: "logistics/proof-of-delivery.approved",
  rejected: "logistics/proof-of-delivery.rejected",
  cancelled: "logistics/proof-of-delivery.cancelled",
  closed: "logistics/proof-of-delivery.closed",
  riskDetected: "logistics/proof-of-delivery.risk-detected",
  nextActionRecommended: "logistics/proof-of-delivery.next-action-recommended",
} as const;
