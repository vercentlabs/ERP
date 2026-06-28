export const fixedAssetsCreateWorkflow = {
  module: "finance/fixed-assets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/fixed-assets record ${recordId}`;
  },
};
