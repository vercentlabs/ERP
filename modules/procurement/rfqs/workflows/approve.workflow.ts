export const rfqsApproveWorkflow = {
  module: "procurement/rfqs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/rfqs record ${recordId}`;
  },
};
