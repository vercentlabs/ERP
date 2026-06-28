export const taxComplianceApproveWorkflow = {
  module: "compliance/tax-compliance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/tax-compliance record ${recordId}`;
  },
};
