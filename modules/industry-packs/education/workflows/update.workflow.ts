export const educationUpdateWorkflow = {
  module: "industry-packs/education",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/education record ${recordId}`;
  },
};
