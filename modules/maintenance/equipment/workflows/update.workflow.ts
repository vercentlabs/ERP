export const equipmentUpdateWorkflow = {
  module: "maintenance/equipment",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/equipment record ${recordId}`;
  },
};
