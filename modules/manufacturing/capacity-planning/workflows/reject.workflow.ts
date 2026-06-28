export const capacityPlanningRejectWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
