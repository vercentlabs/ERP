export const packingCancelWorkflow = {
  module: "warehouse/packing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for warehouse/packing record ${recordId}`;
  },
};
