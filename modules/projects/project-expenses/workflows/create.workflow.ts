export const projectExpensesCreateWorkflow = {
  module: "projects/project-expenses",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/project-expenses record ${recordId}`;
  },
};
