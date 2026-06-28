export const discountsCloseWorkflow = {
  module: "sales/discounts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/discounts record ${recordId}`;
  },
};
