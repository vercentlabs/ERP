export const projectBillingCreateWorkflow = {
  module: "projects/project-billing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/project-billing record ${recordId}`;
  },
};
