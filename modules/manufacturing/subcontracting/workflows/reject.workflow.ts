export const subcontractingRejectWorkflow = {
  module: "manufacturing/subcontracting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
