export const replenishmentTasksSubmitWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
