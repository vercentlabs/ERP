export const projectTemplatesCreateWorkflow = {
  module: "projects/project-templates",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/project-templates record ${recordId}`;
  },
};
