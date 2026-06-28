export const projectCostingApproveWorkflow = {
  module: "projects/project-costing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/project-costing record ${recordId}`;
  },
};
