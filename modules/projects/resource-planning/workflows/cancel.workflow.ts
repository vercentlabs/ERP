export const resourcePlanningCancelWorkflow = {
  module: "projects/resource-planning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/resource-planning record ${recordId}`;
  },
};
