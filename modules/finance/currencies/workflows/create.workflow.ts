export const currenciesCreateWorkflow = {
  module: "finance/currencies",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/currencies record ${recordId}`;
  },
};
