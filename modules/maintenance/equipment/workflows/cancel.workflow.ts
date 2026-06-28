export const equipmentCancelWorkflow = {
  module: "maintenance/equipment",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/equipment record ${recordId}`;
  },
};
