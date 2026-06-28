export const replenishmentTasksCreateWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
