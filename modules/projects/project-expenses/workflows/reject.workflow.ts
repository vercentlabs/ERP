export const projectExpensesRejectWorkflow = {
  module: "projects/project-expenses",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/project-expenses record ${recordId}`;
  },
};
