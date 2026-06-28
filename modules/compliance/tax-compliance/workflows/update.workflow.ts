export const taxComplianceUpdateWorkflow = {
  module: "compliance/tax-compliance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/tax-compliance record ${recordId}`;
  },
};
