export const taxComplianceCreateWorkflow = {
  module: "compliance/tax-compliance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/tax-compliance record ${recordId}`;
  },
};
