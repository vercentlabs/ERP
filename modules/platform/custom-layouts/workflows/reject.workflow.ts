export const customLayoutsRejectWorkflow = {
  module: "platform/custom-layouts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/custom-layouts record ${recordId}`;
  },
};
