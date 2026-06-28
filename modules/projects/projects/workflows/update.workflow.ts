export const projectsUpdateWorkflow = {
  module: "projects/projects",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/projects record ${recordId}`;
  },
};
