export const routePlanningApproveWorkflow = {
  module: "field-service/route-planning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/route-planning record ${recordId}`;
  },
};
