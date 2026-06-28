export const maintenanceOrdersCreateWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
