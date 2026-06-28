export const putawayCloseWorkflow = {
  module: "warehouse/putaway",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/putaway record ${recordId}`;
  },
};
