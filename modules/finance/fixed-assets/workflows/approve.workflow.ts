export const fixedAssetsApproveWorkflow = {
  module: "finance/fixed-assets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/fixed-assets record ${recordId}`;
  },
};
