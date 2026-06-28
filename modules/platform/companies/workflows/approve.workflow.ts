export const companiesApproveWorkflow = {
  module: "platform/companies",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/companies record ${recordId}`;
  },
};
