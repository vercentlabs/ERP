export const projectTasksUpdateWorkflow = {
  module: "projects/project-tasks",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/project-tasks record ${recordId}`;
  },
};
