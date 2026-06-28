export const capacityPlanningCancelWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
