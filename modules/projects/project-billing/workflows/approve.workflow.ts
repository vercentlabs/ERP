export const projectBillingApproveWorkflow = {
  module: "projects/project-billing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/project-billing record ${recordId}`;
  },
};
