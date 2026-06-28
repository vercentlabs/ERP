export const projectCostingSubmitWorkflow = {
  module: "projects/project-costing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/project-costing record ${recordId}`;
  },
};
