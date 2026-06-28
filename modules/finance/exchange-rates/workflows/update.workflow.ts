export const exchangeRatesUpdateWorkflow = {
  module: "finance/exchange-rates",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/exchange-rates record ${recordId}`;
  },
};
