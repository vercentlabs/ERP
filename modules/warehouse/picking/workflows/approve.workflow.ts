export const pickingApproveWorkflow = {
  module: "warehouse/picking",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/picking record ${recordId}`;
  },
};
