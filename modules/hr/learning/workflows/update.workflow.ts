export const learningUpdateWorkflow = {
  module: "hr/learning",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/learning record ${recordId}`;
  },
};
