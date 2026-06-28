export const preventiveMaintenanceUpdateWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
