export const routePlanningCancelWorkflow = {
  module: "field-service/route-planning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/route-planning record ${recordId}`;
  },
};
