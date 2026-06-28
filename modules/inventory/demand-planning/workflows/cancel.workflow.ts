export const demandPlanningCancelWorkflow = {
  module: "inventory/demand-planning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/demand-planning record ${recordId}`;
  },
};
