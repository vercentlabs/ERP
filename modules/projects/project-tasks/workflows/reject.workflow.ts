export const projectTasksRejectWorkflow = {
  module: "projects/project-tasks",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/project-tasks record ${recordId}`;
  },
};
