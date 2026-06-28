export const salesOrdersCreateWorkflow = {
  module: "sales/sales-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/sales-orders record ${recordId}`;
  },
};
