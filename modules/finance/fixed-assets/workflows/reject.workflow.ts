export const fixedAssetsRejectWorkflow = {
  module: "finance/fixed-assets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/fixed-assets record ${recordId}`;
  },
};
