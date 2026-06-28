export const projectExpensesCloseWorkflow = {
  module: "projects/project-expenses",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/project-expenses record ${recordId}`;
  },
};
