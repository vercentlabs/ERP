export const customFieldsCloseWorkflow = {
  module: "platform/custom-fields",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/custom-fields record ${recordId}`;
  },
};
