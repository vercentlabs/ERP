export const procurementPoliciesCancelWorkflow = {
  module: "procurement/procurement-policies",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/procurement-policies record ${recordId}`;
  },
};
