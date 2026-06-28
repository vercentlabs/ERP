export const routingsApproveWorkflow = {
  module: "manufacturing/routings",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/routings record ${recordId}`;
  },
};
