export const maintenanceOrdersRejectWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
