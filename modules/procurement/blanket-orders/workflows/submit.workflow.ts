export const blanketOrdersSubmitWorkflow = {
  module: "procurement/blanket-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/blanket-orders record ${recordId}`;
  },
};
