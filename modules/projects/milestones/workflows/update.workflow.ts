export const milestonesUpdateWorkflow = {
  module: "projects/milestones",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/milestones record ${recordId}`;
  },
};
