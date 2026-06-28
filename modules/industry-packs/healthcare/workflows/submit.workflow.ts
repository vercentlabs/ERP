export const healthcareSubmitWorkflow = {
  module: "industry-packs/healthcare",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/healthcare record ${recordId}`;
  },
};
