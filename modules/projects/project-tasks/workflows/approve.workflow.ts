export const projectTasksApproveWorkflow = {
  module: "projects/project-tasks",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/project-tasks record ${recordId}`;
  },
};
