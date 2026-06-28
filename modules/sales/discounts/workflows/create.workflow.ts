export const discountsCreateWorkflow = {
  module: "sales/discounts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/discounts record ${recordId}`;
  },
};
