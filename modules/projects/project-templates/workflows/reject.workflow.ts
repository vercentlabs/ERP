export const projectTemplatesRejectWorkflow = {
  module: "projects/project-templates",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/project-templates record ${recordId}`;
  },
};
