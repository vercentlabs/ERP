export const customObjectsRejectWorkflow = {
  module: "extension-studio/custom-objects",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-objects record ${recordId}`;
  },
};
