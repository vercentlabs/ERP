export const resourcePlanningCloseWorkflow = {
  module: "projects/resource-planning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/resource-planning record ${recordId}`;
  },
};
