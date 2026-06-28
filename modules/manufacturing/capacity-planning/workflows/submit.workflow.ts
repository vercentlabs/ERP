export const capacityPlanningSubmitWorkflow = {
  module: "manufacturing/capacity-planning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/capacity-planning record ${recordId}`;
  },
};
