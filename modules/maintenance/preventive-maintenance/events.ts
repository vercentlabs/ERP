export const events = {
  created: "maintenance/preventive-maintenance.created",
  updated: "maintenance/preventive-maintenance.updated",
  submitted: "maintenance/preventive-maintenance.submitted",
  approved: "maintenance/preventive-maintenance.approved",
  rejected: "maintenance/preventive-maintenance.rejected",
  cancelled: "maintenance/preventive-maintenance.cancelled",
  closed: "maintenance/preventive-maintenance.closed",
  riskDetected: "maintenance/preventive-maintenance.risk-detected",
  nextActionRecommended: "maintenance/preventive-maintenance.next-action-recommended",
} as const;
