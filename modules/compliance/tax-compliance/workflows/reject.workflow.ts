export const taxComplianceRejectWorkflow = {
  module: "compliance/tax-compliance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/tax-compliance record ${recordId}`;
  },
};
