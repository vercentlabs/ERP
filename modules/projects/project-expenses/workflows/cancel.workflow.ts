export const projectExpensesCancelWorkflow = {
  module: "projects/project-expenses",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/project-expenses record ${recordId}`;
  },
};
