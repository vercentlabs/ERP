export const currenciesCloseWorkflow = {
  module: "finance/currencies",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/currencies record ${recordId}`;
  },
};
