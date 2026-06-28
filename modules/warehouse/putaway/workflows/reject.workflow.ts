export const putawayRejectWorkflow = {
  module: "warehouse/putaway",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/putaway record ${recordId}`;
  },
};
