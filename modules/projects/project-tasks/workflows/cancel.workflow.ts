export const projectTasksCancelWorkflow = {
  module: "projects/project-tasks",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/project-tasks record ${recordId}`;
  },
};
