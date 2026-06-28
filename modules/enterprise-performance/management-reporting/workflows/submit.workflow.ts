export const managementReportingSubmitWorkflow = {
  module: "enterprise-performance/management-reporting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/management-reporting record ${recordId}`;
  },
};
