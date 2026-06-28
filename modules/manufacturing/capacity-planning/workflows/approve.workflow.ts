export const capacityPlanningApproveWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
