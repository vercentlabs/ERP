export const replenishmentTasksRejectWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
