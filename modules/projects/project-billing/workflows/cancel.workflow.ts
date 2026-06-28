export const projectBillingCancelWorkflow = {
  module: "projects/project-billing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/project-billing record ${recordId}`;
  },
};
