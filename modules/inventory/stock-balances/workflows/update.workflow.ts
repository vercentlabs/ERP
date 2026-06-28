export const stockBalancesUpdateWorkflow = {
  module: "inventory/stock-balances",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/stock-balances record ${recordId}`;
  },
};
