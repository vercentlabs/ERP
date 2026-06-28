export const binsApproveWorkflow = {
  module: "warehouse/bins",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/bins record ${recordId}`;
  },
};
