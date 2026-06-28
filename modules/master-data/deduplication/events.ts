export const events = {
  created: "master-data/deduplication.created",
  updated: "master-data/deduplication.updated",
  submitted: "master-data/deduplication.submitted",
  approved: "master-data/deduplication.approved",
  rejected: "master-data/deduplication.rejected",
  cancelled: "master-data/deduplication.cancelled",
  closed: "master-data/deduplication.closed",
  riskDetected: "master-data/deduplication.risk-detected",
  nextActionRecommended: "master-data/deduplication.next-action-recommended",
} as const;
