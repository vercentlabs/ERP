export const customFieldsCreateWorkflow = {
  module: "platform/custom-fields",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/custom-fields record ${recordId}`;
  },
};
