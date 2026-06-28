export const projectTemplatesCancelWorkflow = {
  module: "projects/project-templates",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/project-templates record ${recordId}`;
  },
};
