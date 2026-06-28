export const learningCloseWorkflow = {
  module: "hr/learning",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/learning record ${recordId}`;
  },
};
