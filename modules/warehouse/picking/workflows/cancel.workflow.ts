export const pickingCancelWorkflow = {
  module: "warehouse/picking",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/picking record ${recordId}`;
  },
};
