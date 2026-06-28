export const putawaySubmitWorkflow = {
  module: "warehouse/putaway",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/putaway record ${recordId}`;
  },
};
