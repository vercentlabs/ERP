export const exchangeRatesSubmitWorkflow = {
  module: "finance/exchange-rates",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/exchange-rates record ${recordId}`;
  },
};
