export const apparelCloseWorkflow = {
  module: "industry-packs/apparel",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/apparel record ${recordId}`;
  },
};
