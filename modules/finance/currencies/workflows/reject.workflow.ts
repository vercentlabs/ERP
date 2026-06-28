export const currenciesRejectWorkflow = {
  module: "finance/currencies",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/currencies record ${recordId}`;
  },
};
