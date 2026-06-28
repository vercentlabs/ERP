export const milestonesRejectWorkflow = {
  module: "projects/milestones",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/milestones record ${recordId}`;
  },
};
