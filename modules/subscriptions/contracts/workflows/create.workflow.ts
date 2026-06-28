export const contractsCreateWorkflow = {
  module: "subscriptions/contracts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/contracts record ${recordId}`;
  },
};
