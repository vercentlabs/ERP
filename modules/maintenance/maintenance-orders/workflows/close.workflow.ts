export const maintenanceOrdersCloseWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
