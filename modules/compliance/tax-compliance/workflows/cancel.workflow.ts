export const taxComplianceCancelWorkflow = {
  module: "compliance/tax-compliance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/tax-compliance record ${recordId}`;
  },
};
