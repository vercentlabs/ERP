export const educationCancelWorkflow = {
  module: "industry-packs/education",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/education record ${recordId}`;
  },
};
