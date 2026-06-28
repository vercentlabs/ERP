export const preventiveMaintenanceCloseWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
