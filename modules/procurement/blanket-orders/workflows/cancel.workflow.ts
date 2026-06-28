export const blanketOrdersCancelWorkflow = {
  module: "procurement/blanket-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/blanket-orders record ${recordId}`;
  },
};
