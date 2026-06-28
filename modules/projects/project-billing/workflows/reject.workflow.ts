export const projectBillingRejectWorkflow = {
  module: "projects/project-billing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/project-billing record ${recordId}`;
  },
};
