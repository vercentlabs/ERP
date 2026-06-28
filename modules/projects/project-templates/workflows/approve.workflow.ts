export const projectTemplatesApproveWorkflow = {
  module: "projects/project-templates",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/project-templates record ${recordId}`;
  },
};
