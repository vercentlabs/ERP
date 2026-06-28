export const learningCreateWorkflow = {
  module: "hr/learning",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/learning record ${recordId}`;
  },
};
