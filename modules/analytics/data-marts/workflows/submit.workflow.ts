export const dataMartsSubmitWorkflow = {
  module: "analytics/data-marts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/data-marts record ${recordId}`;
  },
};
