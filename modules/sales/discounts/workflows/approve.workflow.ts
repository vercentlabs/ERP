export const discountsApproveWorkflow = {
  module: "sales/discounts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/discounts record ${recordId}`;
  },
};
