export const retailSubmitWorkflow = {
  module: "industry-packs/retail",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/retail record ${recordId}`;
  },
};
