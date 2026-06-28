export const managementReportingCloseWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
