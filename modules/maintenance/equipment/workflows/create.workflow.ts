export const equipmentCreateWorkflow = {
  module: "maintenance/equipment",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/equipment record ${recordId}`;
  },
};
