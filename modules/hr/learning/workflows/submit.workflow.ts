export const learningSubmitWorkflow = {
  module: "hr/learning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/learning record ${recordId}`;
  },
};
