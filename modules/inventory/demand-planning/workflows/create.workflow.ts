export const demandPlanningCreateWorkflow = {
  module: "inventory/demand-planning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/demand-planning record ${recordId}`;
  },
};
