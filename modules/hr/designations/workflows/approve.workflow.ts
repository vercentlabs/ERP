export const designationsApproveWorkflow = {
  module: "hr/designations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/designations record ${recordId}`;
  },
};
