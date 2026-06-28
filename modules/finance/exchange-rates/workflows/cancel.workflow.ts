export const exchangeRatesCancelWorkflow = {
  module: "finance/exchange-rates",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/exchange-rates record ${recordId}`;
  },
};
