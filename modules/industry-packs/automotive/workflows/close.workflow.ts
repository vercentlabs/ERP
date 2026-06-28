export const automotiveCloseWorkflow = {
  module: "industry-packs/automotive",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/automotive record ${recordId}`;
  },
};
