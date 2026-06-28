export const nonprofitCloseWorkflow = {
  module: "industry-packs/nonprofit",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
