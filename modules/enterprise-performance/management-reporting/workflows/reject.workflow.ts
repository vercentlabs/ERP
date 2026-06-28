export const managementReportingRejectWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
