export const stockBalancesSubmitWorkflow = {
  module: "inventory/stock-balances",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/stock-balances record ${recordId}`;
  },
};
