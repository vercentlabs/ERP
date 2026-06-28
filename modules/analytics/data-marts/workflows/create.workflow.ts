export const dataMartsCreateWorkflow = {
  module: "analytics/data-marts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/data-marts record ${recordId}`;
  },
};
