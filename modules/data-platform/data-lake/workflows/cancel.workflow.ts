export const dataLakeCancelWorkflow = {
  module: "data-platform/data-lake",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/data-lake record ${recordId}`;
  },
};
