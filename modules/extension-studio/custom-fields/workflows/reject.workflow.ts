export const customFieldsRejectWorkflow = {
  module: "extension-studio/custom-fields",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-fields record ${recordId}`;
  },
};
