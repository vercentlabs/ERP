export const demandPlanningCloseWorkflow = {
  module: "inventory/demand-planning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/demand-planning record ${recordId}`;
  },
};
