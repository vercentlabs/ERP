export const resourcePlanningCreateWorkflow = {
  module: "projects/resource-planning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/resource-planning record ${recordId}`;
  },
};
