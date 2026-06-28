export const milestonesApproveWorkflow = {
  module: "projects/milestones",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/milestones record ${recordId}`;
  },
};
