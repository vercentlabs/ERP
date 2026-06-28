export const sustainabilityReportsCancelWorkflow = {
  module: "sustainability/sustainability-reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/sustainability-reports record ${recordId}`;
  },
};
