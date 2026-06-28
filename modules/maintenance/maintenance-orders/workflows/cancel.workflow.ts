export const maintenanceOrdersCancelWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
