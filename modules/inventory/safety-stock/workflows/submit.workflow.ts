export const safetyStockSubmitWorkflow = {
  module: "inventory/safety-stock",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/safety-stock record ${recordId}`;
  },
};
