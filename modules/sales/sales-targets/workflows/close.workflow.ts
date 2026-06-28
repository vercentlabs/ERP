export const salesTargetsCloseWorkflow = {
  module: "sales/sales-targets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/sales-targets record ${recordId}`;
  },
};
