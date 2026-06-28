export const replenishmentTasksApproveWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
