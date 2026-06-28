export const wavesUpdateWorkflow = {
  module: "warehouse/waves",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/waves record ${recordId}`;
  },
};
