export const putawayCancelWorkflow = {
  module: "warehouse/putaway",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/putaway record ${recordId}`;
  },
};
