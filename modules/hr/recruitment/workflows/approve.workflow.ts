export const recruitmentApproveWorkflow = {
  module: "hr/recruitment",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/recruitment record ${recordId}`;
  },
};
