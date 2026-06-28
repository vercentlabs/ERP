export const projectsCreateWorkflow = {
  module: "projects/projects",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/projects record ${recordId}`;
  },
};
