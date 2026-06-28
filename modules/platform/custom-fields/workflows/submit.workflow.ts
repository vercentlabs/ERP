export const customFieldsSubmitWorkflow = {
  module: "platform/custom-fields",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/custom-fields record ${recordId}`;
  },
};
