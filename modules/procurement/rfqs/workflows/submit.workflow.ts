export const rfqsSubmitWorkflow = {
  module: "procurement/rfqs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/rfqs record ${recordId}`;
  },
};
