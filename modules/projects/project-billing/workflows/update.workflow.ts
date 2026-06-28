export const projectBillingUpdateWorkflow = {
  module: "projects/project-billing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/project-billing record ${recordId}`;
  },
};
