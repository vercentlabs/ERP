export const discountsSubmitWorkflow = {
  module: "sales/discounts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/discounts record ${recordId}`;
  },
};
