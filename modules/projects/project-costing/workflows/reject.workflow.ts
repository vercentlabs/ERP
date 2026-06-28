export const projectCostingRejectWorkflow = {
  module: "projects/project-costing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/project-costing record ${recordId}`;
  },
};
