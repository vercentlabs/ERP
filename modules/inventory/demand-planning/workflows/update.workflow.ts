export const demandPlanningUpdateWorkflow = {
  module: "inventory/demand-planning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/demand-planning record ${recordId}`;
  },
};
