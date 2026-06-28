export const exchangeRatesCloseWorkflow = {
  module: "finance/exchange-rates",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/exchange-rates record ${recordId}`;
  },
};
