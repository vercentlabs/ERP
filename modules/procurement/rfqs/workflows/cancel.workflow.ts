export const rfqsCancelWorkflow = {
  module: "procurement/rfqs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/rfqs record ${recordId}`;
  },
};
