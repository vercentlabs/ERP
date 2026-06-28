export const projectTemplatesCloseWorkflow = {
  module: "projects/project-templates",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/project-templates record ${recordId}`;
  },
};
