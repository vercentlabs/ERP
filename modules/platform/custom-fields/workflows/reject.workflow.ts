export const customFieldsRejectWorkflow = {
  module: "platform/custom-fields",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/custom-fields record ${recordId}`;
  },
};
