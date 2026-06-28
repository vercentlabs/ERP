export const projectExpensesApproveWorkflow = {
  module: "projects/project-expenses",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/project-expenses record ${recordId}`;
  },
};
