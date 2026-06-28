export const apparelApproveWorkflow = {
  module: "industry-packs/apparel",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/apparel record ${recordId}`;
  },
};
