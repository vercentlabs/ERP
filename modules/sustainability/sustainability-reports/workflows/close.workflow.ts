export const sustainabilityReportsCloseWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
