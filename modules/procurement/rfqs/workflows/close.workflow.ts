export const rfqsCloseWorkflow = {
  module: "procurement/rfqs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/rfqs record ${recordId}`;
  },
};
