export const educationCloseWorkflow = {
  module: "industry-packs/education",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/education record ${recordId}`;
  },
};
