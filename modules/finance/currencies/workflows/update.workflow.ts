export const currenciesUpdateWorkflow = {
  module: "finance/currencies",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/currencies record ${recordId}`;
  },
};
