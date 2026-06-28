export const dataMartsRejectWorkflow = {
  module: "analytics/data-marts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/data-marts record ${recordId}`;
  },
};
