export const managementReportingCancelWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
