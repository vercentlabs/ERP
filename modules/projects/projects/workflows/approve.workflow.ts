export const projectsApproveWorkflow = {
  module: "projects/projects",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/projects record ${recordId}`;
  },
};
