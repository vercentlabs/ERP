export const routePlanningCreateWorkflow = {
  module: "field-service/route-planning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/route-planning record ${recordId}`;
  },
};
