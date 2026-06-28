export const projectTasksCreateWorkflow = {
  module: "projects/project-tasks",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/project-tasks record ${recordId}`;
  },
};
