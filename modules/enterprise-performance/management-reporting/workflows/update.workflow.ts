export const managementReportingUpdateWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
