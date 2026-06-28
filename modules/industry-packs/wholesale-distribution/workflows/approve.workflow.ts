export const wholesaleDistributionApproveWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
