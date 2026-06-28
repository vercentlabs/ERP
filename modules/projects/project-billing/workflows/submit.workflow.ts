export const projectBillingSubmitWorkflow = {
  module: "projects/project-billing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/project-billing record ${recordId}`;
  },
};
