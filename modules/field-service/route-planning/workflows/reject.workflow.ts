export const routePlanningRejectWorkflow = {
  module: "field-service/route-planning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/route-planning record ${recordId}`;
  },
};
