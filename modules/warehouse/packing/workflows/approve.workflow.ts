export const packingApproveWorkflow = {
  module: "warehouse/packing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/packing record ${recordId}`;
  },
};
