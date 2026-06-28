export const exchangeRatesRejectWorkflow = {
  module: "finance/exchange-rates",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/exchange-rates record ${recordId}`;
  },
};
