export const routePlanningSubmitWorkflow = {
  module: "field-service/route-planning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/route-planning record ${recordId}`;
  },
};
