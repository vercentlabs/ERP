export const equipmentCloseWorkflow = {
  module: "maintenance/equipment",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/equipment record ${recordId}`;
  },
};
