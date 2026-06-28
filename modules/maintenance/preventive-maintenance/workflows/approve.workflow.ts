export const preventiveMaintenanceApproveWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
