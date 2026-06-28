export const rfqsRejectWorkflow = {
  module: "procurement/rfqs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/rfqs record ${recordId}`;
  },
};
