export const milestonesCancelWorkflow = {
  module: "projects/milestones",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/milestones record ${recordId}`;
  },
};
