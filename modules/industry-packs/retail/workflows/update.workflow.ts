export const retailUpdateWorkflow = {
  module: "industry-packs/retail",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/retail record ${recordId}`;
  },
};
