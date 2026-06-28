export const events = {
  created: "commerce/channel-sync.created",
  updated: "commerce/channel-sync.updated",
  submitted: "commerce/channel-sync.submitted",
  approved: "commerce/channel-sync.approved",
  rejected: "commerce/channel-sync.rejected",
  cancelled: "commerce/channel-sync.cancelled",
  closed: "commerce/channel-sync.closed",
  riskDetected: "commerce/channel-sync.risk-detected",
  nextActionRecommended: "commerce/channel-sync.next-action-recommended",
} as const;
