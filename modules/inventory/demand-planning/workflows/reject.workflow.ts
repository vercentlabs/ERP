export const demandPlanningRejectWorkflow = {
  module: "inventory/demand-planning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/demand-planning record ${recordId}`;
  },
};
