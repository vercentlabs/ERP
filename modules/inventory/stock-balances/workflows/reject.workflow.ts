export const stockBalancesRejectWorkflow = {
  module: "inventory/stock-balances",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/stock-balances record ${recordId}`;
  },
};
