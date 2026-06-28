export const healthcareCloseWorkflow = {
  module: "industry-packs/healthcare",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/healthcare record ${recordId}`;
  },
};
