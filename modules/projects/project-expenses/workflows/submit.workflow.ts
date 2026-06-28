export const projectExpensesSubmitWorkflow = {
  module: "projects/project-expenses",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/project-expenses record ${recordId}`;
  },
};
