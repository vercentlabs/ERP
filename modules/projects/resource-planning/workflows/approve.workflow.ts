export const resourcePlanningApproveWorkflow = {
  module: "projects/resource-planning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/resource-planning record ${recordId}`;
  },
};
