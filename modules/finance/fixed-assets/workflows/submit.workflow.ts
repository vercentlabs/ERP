export const fixedAssetsSubmitWorkflow = {
  module: "finance/fixed-assets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/fixed-assets record ${recordId}`;
  },
};
