export const promotionsSubmitWorkflow = {
  module: "commerce/promotions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/promotions record ${recordId}`;
  },
};
