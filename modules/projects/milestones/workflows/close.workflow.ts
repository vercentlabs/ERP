export const milestonesCloseWorkflow = {
  module: "projects/milestones",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/milestones record ${recordId}`;
  },
};
