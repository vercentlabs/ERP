export const currenciesSubmitWorkflow = {
  module: "finance/currencies",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/currencies record ${recordId}`;
  },
};
