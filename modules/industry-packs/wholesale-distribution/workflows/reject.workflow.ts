export const wholesaleDistributionRejectWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
