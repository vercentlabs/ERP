export const mitigationsCreateWorkflow = {
  module: "risk-management/mitigations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/mitigations record ${recordId}`;
  },
};
