export const capacityPlanningUpdateWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
