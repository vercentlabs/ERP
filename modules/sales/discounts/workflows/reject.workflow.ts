export const discountsRejectWorkflow = {
  module: "sales/discounts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/discounts record ${recordId}`;
  },
};
