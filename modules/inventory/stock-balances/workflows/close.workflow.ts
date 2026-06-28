export const stockBalancesCloseWorkflow = {
  module: "inventory/stock-balances",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/stock-balances record ${recordId}`;
  },
};
