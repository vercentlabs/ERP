export const customFieldsUpdateWorkflow = {
  module: "platform/custom-fields",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/custom-fields record ${recordId}`;
  },
};
