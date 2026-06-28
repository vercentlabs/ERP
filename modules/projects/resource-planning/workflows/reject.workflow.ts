export const resourcePlanningRejectWorkflow = {
  module: "projects/resource-planning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/resource-planning record ${recordId}`;
  },
};
