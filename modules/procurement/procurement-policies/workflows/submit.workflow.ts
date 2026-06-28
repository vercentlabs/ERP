export const procurementPoliciesSubmitWorkflow = {
  module: "procurement/procurement-policies",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/procurement-policies record ${recordId}`;
  },
};
