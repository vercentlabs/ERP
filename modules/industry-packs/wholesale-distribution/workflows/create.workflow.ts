export const wholesaleDistributionCreateWorkflow = {
  module: "industry-packs/wholesale-distribution",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/wholesale-distribution record ${recordId}`;
  },
};
