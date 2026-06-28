export const putawayApproveWorkflow = {
  module: "warehouse/putaway",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/putaway record ${recordId}`;
  },
};
