export const projectCostingCancelWorkflow = {
  module: "projects/project-costing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/project-costing record ${recordId}`;
  },
};
