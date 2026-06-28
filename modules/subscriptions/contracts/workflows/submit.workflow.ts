export const contractsSubmitWorkflow = {
  module: "subscriptions/contracts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/contracts record ${recordId}`;
  },
};
