export const subcontractingCancelWorkflow = {
  module: "manufacturing/subcontracting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
