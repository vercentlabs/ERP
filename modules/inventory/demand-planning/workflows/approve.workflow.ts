export const demandPlanningApproveWorkflow = {
  module: "inventory/demand-planning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/demand-planning record ${recordId}`;
  },
};
