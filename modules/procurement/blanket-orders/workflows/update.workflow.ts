export const blanketOrdersUpdateWorkflow = {
  module: "procurement/blanket-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/blanket-orders record ${recordId}`;
  },
};
