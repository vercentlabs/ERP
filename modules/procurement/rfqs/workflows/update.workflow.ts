export const rfqsUpdateWorkflow = {
  module: "procurement/rfqs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/rfqs record ${recordId}`;
  },
};
