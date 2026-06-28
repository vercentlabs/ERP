export const exchangeRatesApproveWorkflow = {
  module: "finance/exchange-rates",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/exchange-rates record ${recordId}`;
  },
};
