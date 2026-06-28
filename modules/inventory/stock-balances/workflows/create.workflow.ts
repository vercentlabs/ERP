export const stockBalancesCreateWorkflow = {
  module: "inventory/stock-balances",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/stock-balances record ${recordId}`;
  },
};
