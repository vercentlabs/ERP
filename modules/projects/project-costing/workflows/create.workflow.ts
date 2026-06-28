export const projectCostingCreateWorkflow = {
  module: "projects/project-costing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/project-costing record ${recordId}`;
  },
};
