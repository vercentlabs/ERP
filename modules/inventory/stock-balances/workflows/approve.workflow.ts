export const stockBalancesApproveWorkflow = {
  module: "inventory/stock-balances",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/stock-balances record ${recordId}`;
  },
};
