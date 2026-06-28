export const customLayoutsSubmitWorkflow = {
  module: "platform/custom-layouts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/custom-layouts record ${recordId}`;
  },
};
