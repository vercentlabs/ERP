export const capacityPlanningCloseWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
