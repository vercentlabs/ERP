export const resourcePlanningSubmitWorkflow = {
  module: "projects/resource-planning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/resource-planning record ${recordId}`;
  },
};
