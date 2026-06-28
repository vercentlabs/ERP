export const events = {
  created: "master-data/parties.created",
  updated: "master-data/parties.updated",
  submitted: "master-data/parties.submitted",
  approved: "master-data/parties.approved",
  rejected: "master-data/parties.rejected",
  cancelled: "master-data/parties.cancelled",
  closed: "master-data/parties.closed",
  riskDetected: "master-data/parties.risk-detected",
  nextActionRecommended: "master-data/parties.next-action-recommended",
} as const;
