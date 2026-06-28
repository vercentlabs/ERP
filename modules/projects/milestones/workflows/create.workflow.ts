export const milestonesCreateWorkflow = {
  module: "projects/milestones",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/milestones record ${recordId}`;
  },
};
