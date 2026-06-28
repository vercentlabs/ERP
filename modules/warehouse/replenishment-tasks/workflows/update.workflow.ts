export const replenishmentTasksUpdateWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
