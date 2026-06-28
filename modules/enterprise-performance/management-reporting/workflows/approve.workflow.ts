export const managementReportingApproveWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
