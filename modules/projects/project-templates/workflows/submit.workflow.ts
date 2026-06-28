export const projectTemplatesSubmitWorkflow = {
  module: "projects/project-templates",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/project-templates record ${recordId}`;
  },
};
