export const customObjectsSubmitWorkflow = {
  module: "extension-studio/custom-objects",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
