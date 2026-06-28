export const retailCloseWorkflow = {
  module: "industry-packs/retail",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/retail record ${recordId}`;
  },
};
