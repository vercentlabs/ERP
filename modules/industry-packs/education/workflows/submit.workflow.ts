export const educationSubmitWorkflow = {
  module: "industry-packs/education",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/education record ${recordId}`;
  },
};
