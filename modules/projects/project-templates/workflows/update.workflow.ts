export const projectTemplatesUpdateWorkflow = {
  module: "projects/project-templates",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/project-templates record ${recordId}`;
  },
};
