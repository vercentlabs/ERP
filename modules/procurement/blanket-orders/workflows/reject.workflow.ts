export const blanketOrdersRejectWorkflow = {
  module: "procurement/blanket-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/blanket-orders record ${recordId}`;
  },
};
