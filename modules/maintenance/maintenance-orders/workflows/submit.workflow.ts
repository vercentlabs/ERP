export const maintenanceOrdersSubmitWorkflow = {
  module: "maintenance/maintenance-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/maintenance-orders record ${recordId}`;
  },
};
