export const projectTasksSubmitWorkflow = {
  module: "projects/project-tasks",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/project-tasks record ${recordId}`;
  },
};
