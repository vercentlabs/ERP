export const maintenanceOrdersApproveWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
