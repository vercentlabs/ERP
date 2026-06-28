export const preventiveMaintenanceRejectWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
