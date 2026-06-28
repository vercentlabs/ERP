export const projectTasksCloseWorkflow = {
  module: "projects/project-tasks",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/project-tasks record ${recordId}`;
  },
};
