export const putawayCreateWorkflow = {
  module: "warehouse/putaway",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/putaway record ${recordId}`;
  },
};
