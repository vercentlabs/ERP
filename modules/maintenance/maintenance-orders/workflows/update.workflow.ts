export const maintenanceOrdersUpdateWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
