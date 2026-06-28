export const projectExpensesUpdateWorkflow = {
  module: "projects/project-expenses",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/project-expenses record ${recordId}`;
  },
};
