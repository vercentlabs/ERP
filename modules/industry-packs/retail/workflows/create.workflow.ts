export const retailCreateWorkflow = {
  module: "industry-packs/retail",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/retail record ${recordId}`;
  },
};
