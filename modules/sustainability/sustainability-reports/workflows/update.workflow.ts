export const sustainabilityReportsUpdateWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
