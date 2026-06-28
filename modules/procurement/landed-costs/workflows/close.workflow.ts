export const landedCostsCloseWorkflow = {
  module: "procurement/landed-costs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/landed-costs record ${recordId}`;
  },
};
