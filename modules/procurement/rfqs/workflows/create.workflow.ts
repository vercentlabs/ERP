export const rfqsCreateWorkflow = {
  module: "procurement/rfqs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/rfqs record ${recordId}`;
  },
};
