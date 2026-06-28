export const procurementPoliciesCloseWorkflow = {
  module: "procurement/procurement-policies",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/procurement-policies record ${recordId}`;
  },
};
