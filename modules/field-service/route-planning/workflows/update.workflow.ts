export const routePlanningUpdateWorkflow = {
  module: "field-service/route-planning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/route-planning record ${recordId}`;
  },
};
