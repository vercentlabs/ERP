export const fixedAssetsUpdateWorkflow = {
  module: "finance/fixed-assets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/fixed-assets record ${recordId}`;
  },
};
