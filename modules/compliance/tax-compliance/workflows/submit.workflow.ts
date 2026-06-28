export const taxComplianceSubmitWorkflow = {
  module: "compliance/tax-compliance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/tax-compliance record ${recordId}`;
  },
};
