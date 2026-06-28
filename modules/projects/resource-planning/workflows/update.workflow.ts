export const resourcePlanningUpdateWorkflow = {
  module: "projects/resource-planning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/resource-planning record ${recordId}`;
  },
};
