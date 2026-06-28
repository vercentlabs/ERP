export const milestonesSubmitWorkflow = {
  module: "projects/milestones",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/milestones record ${recordId}`;
  },
};
