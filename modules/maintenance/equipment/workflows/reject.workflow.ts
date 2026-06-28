export const equipmentRejectWorkflow = {
  module: "maintenance/equipment",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/equipment record ${recordId}`;
  },
};
