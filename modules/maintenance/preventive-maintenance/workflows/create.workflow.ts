export const preventiveMaintenanceCreateWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
