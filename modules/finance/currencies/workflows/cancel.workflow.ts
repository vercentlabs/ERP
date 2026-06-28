export const currenciesCancelWorkflow = {
  module: "finance/currencies",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/currencies record ${recordId}`;
  },
};
