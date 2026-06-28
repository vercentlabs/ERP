export const wavesSubmitWorkflow = {
  module: "warehouse/waves",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/waves record ${recordId}`;
  },
};
