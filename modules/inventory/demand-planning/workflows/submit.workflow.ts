export const demandPlanningSubmitWorkflow = {
  module: "inventory/demand-planning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/demand-planning record ${recordId}`;
  },
};
