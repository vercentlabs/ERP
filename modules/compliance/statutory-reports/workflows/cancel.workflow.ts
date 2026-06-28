export const statutoryReportsCancelWorkflow = {
  module: "compliance/statutory-reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/statutory-reports record ${recordId}`;
  },
};
