export const dataMartsCloseWorkflow = {
  module: "analytics/data-marts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/data-marts record ${recordId}`;
  },
};
