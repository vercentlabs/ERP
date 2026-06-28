export const dataMartsUpdateWorkflow = {
  module: "analytics/data-marts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/data-marts record ${recordId}`;
  },
};
