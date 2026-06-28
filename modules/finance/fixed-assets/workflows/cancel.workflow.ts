export const fixedAssetsCancelWorkflow = {
  module: "finance/fixed-assets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/fixed-assets record ${recordId}`;
  },
};
