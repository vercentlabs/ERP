export const apparelSubmitWorkflow = {
  module: "industry-packs/apparel",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/apparel record ${recordId}`;
  },
};
