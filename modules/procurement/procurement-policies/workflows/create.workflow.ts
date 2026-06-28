export const procurementPoliciesCreateWorkflow = {
  module: "procurement/procurement-policies",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/procurement-policies record ${recordId}`;
  },
};
