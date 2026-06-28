export const projectCostingUpdateWorkflow = {
  module: "projects/project-costing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/project-costing record ${recordId}`;
  },
};
