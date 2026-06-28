export const routePlanningCloseWorkflow = {
  module: "field-service/route-planning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/route-planning record ${recordId}`;
  },
};
