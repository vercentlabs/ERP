export const capacityPlanningCreateWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
