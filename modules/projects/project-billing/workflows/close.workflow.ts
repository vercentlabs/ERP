export const projectBillingCloseWorkflow = {
  module: "projects/project-billing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/project-billing record ${recordId}`;
  },
};
