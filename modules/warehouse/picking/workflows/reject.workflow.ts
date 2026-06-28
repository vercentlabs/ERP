export const pickingRejectWorkflow = {
  module: "warehouse/picking",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/picking record ${recordId}`;
  },
};
