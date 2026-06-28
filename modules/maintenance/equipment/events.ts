export const events = {
  created: "maintenance/equipment.created",
  updated: "maintenance/equipment.updated",
  submitted: "maintenance/equipment.submitted",
  approved: "maintenance/equipment.approved",
  rejected: "maintenance/equipment.rejected",
  cancelled: "maintenance/equipment.cancelled",
  closed: "maintenance/equipment.closed",
  riskDetected: "maintenance/equipment.risk-detected",
  nextActionRecommended: "maintenance/equipment.next-action-recommended",
} as const;
