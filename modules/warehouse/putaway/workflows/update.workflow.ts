export const putawayUpdateWorkflow = {
  module: "warehouse/putaway",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/putaway record ${recordId}`;
  },
};
