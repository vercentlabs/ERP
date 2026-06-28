export const automotiveSubmitWorkflow = {
  module: "industry-packs/automotive",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/automotive record ${recordId}`;
  },
};
