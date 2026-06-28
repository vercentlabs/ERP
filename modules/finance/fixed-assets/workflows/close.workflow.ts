export const fixedAssetsCloseWorkflow = {
  module: "finance/fixed-assets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/fixed-assets record ${recordId}`;
  },
};
