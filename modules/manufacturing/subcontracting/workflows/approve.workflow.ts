export const subcontractingApproveWorkflow = {
  module: "manufacturing/subcontracting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
