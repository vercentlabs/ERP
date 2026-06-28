export const procurementPoliciesUpdateWorkflow = {
  module: "procurement/procurement-policies",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/procurement-policies record ${recordId}`;
  },
};
