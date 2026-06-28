export const replenishmentTasksCancelWorkflow = {
  module: "warehouse/replenishment-tasks",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/replenishment-tasks record ${recordId}`;
  },
};
