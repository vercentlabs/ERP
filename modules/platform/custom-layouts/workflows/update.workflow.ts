export const customLayoutsUpdateWorkflow = {
  module: "platform/custom-layouts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/custom-layouts record ${recordId}`;
  },
};
