export const dataMartsCancelWorkflow = {
  module: "analytics/data-marts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/data-marts record ${recordId}`;
  },
};
