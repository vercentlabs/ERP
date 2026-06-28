export const taxComplianceCloseWorkflow = {
  module: "compliance/tax-compliance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/tax-compliance record ${recordId}`;
  },
};
