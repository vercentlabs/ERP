export const stockBalancesCancelWorkflow = {
  module: "inventory/stock-balances",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/stock-balances record ${recordId}`;
  },
};
