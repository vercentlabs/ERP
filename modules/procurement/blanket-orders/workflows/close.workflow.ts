export const blanketOrdersCloseWorkflow = {
  module: "procurement/blanket-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/blanket-orders record ${recordId}`;
  },
};
