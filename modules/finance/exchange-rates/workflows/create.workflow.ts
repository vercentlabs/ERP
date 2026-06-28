export const exchangeRatesCreateWorkflow = {
  module: "finance/exchange-rates",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/exchange-rates record ${recordId}`;
  },
};
