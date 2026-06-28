export const nonprofitSubmitWorkflow = {
  module: "industry-packs/nonprofit",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
