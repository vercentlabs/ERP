export const checkoutSubmitWorkflow = {
  module: "commerce/checkout",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/checkout record ${recordId}`;
  },
};
