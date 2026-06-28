export const statutoryReportsUpdateWorkflow = {
  module: "compliance/statutory-reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/statutory-reports record ${recordId}`;
  },
};
