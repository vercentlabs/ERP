export const replenishmentTasksCloseWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
