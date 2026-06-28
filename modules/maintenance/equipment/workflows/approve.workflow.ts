export const equipmentApproveWorkflow = {
  module: "maintenance/equipment",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/equipment record ${recordId}`;
  },
};
