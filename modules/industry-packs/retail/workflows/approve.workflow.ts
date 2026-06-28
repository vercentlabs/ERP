export const retailApproveWorkflow = {
  module: "industry-packs/retail",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/retail record ${recordId}`;
  },
};
