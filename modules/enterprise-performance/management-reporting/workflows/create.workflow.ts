export const managementReportingCreateWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
