export const projectCostingCloseWorkflow = {
  module: "projects/project-costing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/project-costing record ${recordId}`;
  },
};
