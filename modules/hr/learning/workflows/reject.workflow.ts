export const learningRejectWorkflow = {
  module: "hr/learning",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/learning record ${recordId}`;
  },
};
